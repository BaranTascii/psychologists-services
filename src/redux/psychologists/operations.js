import { ref, onValue } from "firebase/database";
import { db } from "../../firebase.js";
import { setPsychologists } from "./slice.js";

export const fetchPsychologists = () => (dispatch) => {
  const unsubscribe = onValue(ref(db), (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      dispatch(setPsychologists([]));
      return;
    }

    const psychologistsWithId = Object.values(data).map(
      (psychologist, index) => ({
        id: index,
        ...psychologist,
      }),
    );

    dispatch(setPsychologists(psychologistsWithId));
  });

  return () => {
    unsubscribe();
  };
};
