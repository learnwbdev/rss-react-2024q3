import type { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@constants';
import { convertPerson, isApiPersonList } from '@utils';
import { createCsvString } from 'src/utils/csv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ids } = req.query;

  if (!ids || typeof ids !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid ids parameter' });
  }

  const idList = ids.split(',');

  const selectedCnt = idList.length;
  const filename = `${selectedCnt}_${selectedCnt === 1 ? 'person' : 'people'}`;

  try {
    const results: unknown = await Promise.all(
      idList.map((id) => fetch(`${API_URL}${id}`).then((response) => response.json()))
    );

    if (!isApiPersonList(results)) {
      return res.status(400).json({ error: 'Invalid response' });
    }

    const personList = results.map(convertPerson);

    const csvString = createCsvString(personList);

    res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csvString);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate CSV' });
  }
}
