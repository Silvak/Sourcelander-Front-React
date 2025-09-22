import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProjectData {
  name: string;
  description: string;
  startDate: string;
  duration: string;
  budget: string;
  industry: string;
  complexity: string;
}

interface ProjectState {
  projectData: ProjectData;
}

interface ProjectActions {
  setProjectData: (data: Partial<ProjectData>) => void;
  clearProjectData: () => void;
  getProjectData: () => ProjectData;
}

type ProjectStore = ProjectState & ProjectActions;

const initialProjectData: ProjectData = {
  name: "",
  description: "",
  startDate: "",
  duration: "",
  budget: "",
  industry: "",
  complexity: "",
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projectData: initialProjectData,

      setProjectData: (data: Partial<ProjectData>) => {
        set((state) => ({
          projectData: { ...state.projectData, ...data },
        }));
      },

      clearProjectData: () => {
        set({ projectData: initialProjectData });
      },

      getProjectData: () => {
        return get().projectData;
      },
    }),
    {
      name: "project-storage",
      partialize: (state) => ({ projectData: state.projectData }),
    }
  )
);
