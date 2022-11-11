export default {
  activity_name: ACTIVITY_CONFIG.title,
  scoId: ACTIVITY_CONFIG.scoId,
  grade: 3,
  max_score: 17,
  total_score: 0,
  total_time_spent: 0,
  percentage_completion: "0%",
  selectedTabIndex: 0,
  isFirstTime: true,
  screens: [
    {
      screen: "Introduce",
      interaction_description: "Text, Images and Information supply activity",
      max_score: 2,
      score: 0,
      time_spent: 0,
      save_state: {},
      visited: false,
      elements: {},
    },
    {
      screen: "Explore",
      interaction_description: "Information supply activity",
      max_score: 3,
      score: 0,
      time_spent: 0,
      save_state: {},
      visited: false,
      elements: {},
    },
    {
      screen: "Conclude",
      interaction_description: "Information supply activity",
      max_score: 3,
      score: 0,
      time_spent: 0,
      save_state: {},
      visited: false,
      elements: {},
    },
  ],
  notebook: {
    notebookSavedData: {},
    max_score: 5,
    score: 0,
    interaction_description: "Notebook",
    elements: {},
  },
  markedActivities: [],
  visitedSubIndex: [],
  tabsWithDisabledSubtabs: [],
  defaultLang: "en",
  markedNotebooks: [],
  markedNotebooksValidation: [],
  isAllActivitiesCompleted: false,
  labSubmitted: false,
  concludeDropdown: {},
};