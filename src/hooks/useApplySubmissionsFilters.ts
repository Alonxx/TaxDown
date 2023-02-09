import {TFilterModel, TSubmission} from '../models';
import {useCallback} from 'react';

export const useApplySubmissionFilters = (
  submissions: TSubmission[],
  filters: {
    [key: string]: TFilterModel;
  },
) => {
  const applySubmissionsFilters = useCallback(() => {
    return submissions.filter(submission => {
      return Object.entries(filters).every(([key, filter]) => {
        return (
          !filter.currentElement || submission[key] === filter.currentElement
        );
      });
    });
  }, [filters, submissions]);

  return applySubmissionsFilters;
};
