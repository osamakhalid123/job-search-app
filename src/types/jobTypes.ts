export interface JobState {
    job: {
      attributes: any;
      id: string;
      relationships: {
        skills: Skill[];
      };
    };
  }
  
  export interface Skill {
    id: string;
  }

  export interface skillState {
    [skillId: string]: string; 
  }