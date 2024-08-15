import { ReactNode } from 'react';
import { fetchPeople } from '@api';
import { isString } from '@utils';
import { API_INITIAL_PAGE, URL_PARAM } from '@constants';
import { PersonDetails } from '@components/widgets';
import { SuspenseWrapper } from '@shared/ui';
import { MainPage } from './main-page';

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const Page = async ({ searchParams }: PageProps): Promise<ReactNode> => {
  const {
    [URL_PARAM.PAGE]: pageIn = API_INITIAL_PAGE,
    [URL_PARAM.SEARCH]: searchTermIn = '',
    [URL_PARAM.DETAILS]: personIdIn = '',
  } = searchParams;

  const page = isString(pageIn) ? pageIn : API_INITIAL_PAGE;
  const searchTerm = isString(searchTermIn) ? searchTermIn : '';
  const personId = isString(personIdIn) ? personIdIn : '';

  const peopleResult = await fetchPeople({ page, searchTerm });

  const { data, error } = peopleResult;

  return (
    <>
      <h1 className="visually_hidden">React is Cool</h1>
      {!data ? (
        <div>{error?.message}</div>
      ) : (
        <>
          <MainPage peopleData={data} />
          {personId && (
            <aside className="aside">
              <SuspenseWrapper>
                <PersonDetails personId={personId} />
              </SuspenseWrapper>
            </aside>
          )}
        </>
      )}
    </>
  );
};

export default Page;
