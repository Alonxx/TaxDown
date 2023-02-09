import {TFilterModel, TSubmission} from '../models';
import {useCallback} from 'react';

export const useGetSubmissionsFilters = () => {
  const getSubmissionsFilters = useCallback(
    (
      currentSubmissions: TSubmission[],
      filters: {
        [key: string]: TFilterModel;
      },
      clear?: boolean,
    ) => {
      return Object.keys(currentSubmissions[0]).reduce(
        (acc: {[key: string]: TFilterModel}, key) => {
          if (key !== 'picture') {
            const elements = currentSubmissions.map(item => item[key]);
            acc[key] = {
              id: key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              elements: [...new Set(elements)].sort(),
              currentElement: clear
                ? null
                : filters[key]?.currentElement ?? null,
            };
          }
          return acc;
        },
        {},
      );
    },
    [],
  );
  return getSubmissionsFilters;
};
