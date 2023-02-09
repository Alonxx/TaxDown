import {TSubmission, TInputsField} from '../models';
import {create} from 'zustand';
import {API_URL_TAX, API_URL_TAXES} from '../utils/constants';

interface ISubmissionDataStore {
  submissions: TSubmission[];
  currentSubmissionsFields: TInputsField[];
  deleteSubmission: (index: number) => void;
  postSubmissionTax: (submission: {[key: string]: string}, id: string) => void;
  fetchSubmissionInputFields: (id: string) => void;
  clearSubmissionsFields: () => void;
}

export const useSubmissionDataStore = create<ISubmissionDataStore>(
  (set, get) => ({
    submissions: [],
    currentSubmissionsFields: [],
    deleteSubmission: index => {
      const currentSubmissions = get().submissions;
      const submissionWhitOutElement = currentSubmissions.filter(
        (_, i) => i !== index,
      );
      set(state => ({
        ...state,
        submissions: submissionWhitOutElement,
      }));
    },
    fetchSubmissionInputFields: async id => {
      try {
        const response = await fetch(`${API_URL_TAXES}/${id}/form`);
        const data = await response.json();
        set(state => ({
          ...state,
          currentSubmissionsFields: data,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    postSubmissionTax: async (submission, id) => {
      try {
        const response = await fetch(`${API_URL_TAX}/${id}/form`, {
          method: 'POST',
          body: JSON.stringify(submission),
        });
        await response.json();
      } catch (error) {
        console.log(error);
      }
      set(state => ({
        ...state,
        submissions: [...state.submissions, submission],
      }));
    },
    clearSubmissionsFields: () =>
      set(state => ({
        ...state,
        currentSubmissionsFields: [],
      })),
  }),
);
