import timeboxStore from "~/store/timebox";
import alarmStore from "~/store/alarm";
import savedTimeboxesStore from "~/store/savedTimeboxes";
import indexStore from "~/store/index";

export const defaultStore = () => {
  return {
    ...indexStore,
    modules: {
      timebox: {
        namespaced: true,
        ...timeboxStore
      },
      alarm: {
        namespaced: true,
        ...alarmStore
      },
      savedTimeboxes: {
        namespaced: true,
        ...savedTimeboxesStore
      }
    }
  };
};
