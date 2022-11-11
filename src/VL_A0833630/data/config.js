export const config = {
  scoId: ACTIVITY_CONFIG.scoId,
  releaseVersion: ACTIVITY_CONFIG.releaseVersion,
};
export const notebookData = {
  model: {
    introduce_textarea_1: "",
    introduce_textarea_2: "",
    explore_table_1: { data: [], score: 0 },
    explore_table_2: { data: [], score: 0 },
    conclude_table_1: { data: [], score: 0 },
  },
  pages: [
    {
      pageTitle: "Introduce",
      pageSubtitle: "",
      parent: "",
      index: 0,
      subIndex: 0,
      component: "TextView1",
      pageType: "page",
      pageCounter: 0,
      imageCounter: 0,
      active: true,
      pageDetails: 0,
      validation: true,
    },
    {
      pageTitle: "Explore",
      pageSubtitle: "Page - 1",
      parent: "",
      index: 1,
      subIndex: 0,
      component: "View1",
      pageType: "page",
      pageCounter: 0,
      imageCounter: 0,
      active: true,
      pageDetails: 1,
      validation: true,
    },
    {
      pageTitle: "Explore",
      pageSubtitle: "Page - 2",
      parent: "",
      index: 1,
      subIndex: 1,
      component: "View2",
      pageType: "page",
      pageCounter: 0,
      imageCounter: 0,
      active: true,
      pageDetails: 2,
      validation: true,
    },
    {
      pageTitle: "Explore",
      pageSubtitle: "Page - 3",
      parent: "",
      index: 1,
      subIndex: 2,
      component: "View23",
      pageType: "page",
      pageCounter: 0,
      imageCounter: 0,
      active: true,
      pageDetails: 3,
      validation: true,
    },
    {
      pageTitle: "Conclude",
      pageSubtitle: "",
      parent: "",
      index: 2,
      subIndex: 0,
      component: "TextView",
      pageType: "page",
      pageCounter: 0,
      imageCounter: 0,
      active: false,
      pageDetails: 7,
    },
  ],
};

export const concludeData = {
  stickyNotes: {
    limit: 3,
    maxChar: 45,
  },
};
