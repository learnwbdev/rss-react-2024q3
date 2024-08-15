import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@constants';
import { convertPerson, isApiPersonList } from '@utils';
import { createCsvString } from 'src/utils/csv';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids || typeof ids !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid ids parameter' }, { status: 400 });
  }

  const idList = ids.split(',');

  const selectedCnt = idList.length;
  const filename = `${selectedCnt}_${selectedCnt === 1 ? 'person' : 'people'}`;

  try {
    const results: unknown = await Promise.all(
      idList.map((id) => fetch(`${API_URL}/${id}`).then((response) => response.json()))
    );

    if (!isApiPersonList(results)) {
      return NextResponse.json({ error: 'Invalid response' }, { status: 400 });
    }

    const personList = results.map(convertPerson);
    const csvString = createCsvString(personList);

    const headers = new Headers();

    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', `attachment; filename="${filename}.csv"`);

    return new NextResponse(csvString, {
      headers,
      status: 200,
      statusText: 'OK',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate CSV' }, { status: 500 });
  }
}
