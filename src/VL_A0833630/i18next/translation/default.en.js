import scenarioAudio from "../../assets/audios/en/lab5audio/Scenario.mp3";
import explore1Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 1).mp3";
import exlpore2Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 2).mp3";
import explore3Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 3).mp3";
import explore11Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 1)Denali National Park.mp3";
import explore12Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 1)Saguaro National Park.mp3";
import explore13Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 1)Yasuni National Park.mp3";
import explore21Audio from "../../assets/audios/en/lab5audio/ocotillo explore.mp3";
import explore22Audio from "../../assets/audios/en/lab5audio/zebra explore.mp3";
import explore23Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 2) pasque flower.mp3";
import explore31Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 3)spiny lizard.mp3";
import explore32Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 3)white bellied spider monkey.mp3";
import explore33Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 3)dall sheep.mp3";
import explore34Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 3)capybara.mp3";
import explore35Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 3)collared pika.mp3";
import explore36Audio from "../../assets/audios/en/lab5audio/Explore(Activity Screen 3)Harris antelope squirrel.mp3";
import discover1Audio from "../../assets/audios/en/lab5audio/Discover Tab 1.mp3";
import discover2Audio from "../../assets/audios/en/lab5audio/Discover Tab 2.mp3";
import discover3Audio from "../../assets/audios/en/lab5audio/Discover Tab 3.mp3";
import discover11Audio from "../../assets/audios/en/lab5audio/Discover Tab 1[Correct feedback text].mp3";
import discover12Audio from "../../assets/audios/en/lab5audio/Discover Tab 1(Incorrect feedback text).mp3";
import discover21Audio from "../../assets/audios/en/lab5audio/discover2 correct popup.mp3";
import discover22Audio from "../../assets/audios/en/lab5audio/Discover Tab 2(Incorrect feedback text).mp3";
import discover31Audio from "../../assets/audios/en/lab5audio/discover3 correct popup.mp3";
import discover32Audio from "../../assets/audios/en/lab5audio/Discover Tab 3(Incorrect feedback text).mp3";
import conclude1Audio from "../../assets/audios/en/lab5audio/Conclude 1.mp3";
import conclude2Audio from "../../assets/audios/en/lab5audio/conclude 2.mp3";
import imagineAudio from "../../assets/audios/en/lab5audio/Imagine.mp3";
import earth_concreteImg from "../../assets/images/introduce/earth_concrete.png";
import earthConcreteVideo from "../../assets/videos/earth_concrete.mp4";
// discover slide1
import harissimage from "../../assets/images/discover/Discover1/harris-img.png";
import dallimage from "../../assets/images/discover/Discover1/Dall-sheep-d1.png";
import monkeyimage from "../../assets/images/discover/Discover1/White-bellied-spider-monkey-d1.png";
import pikaimage from "../../assets/images/discover/Discover1/Collared-pika-d1.png";
import pasqueimage from "../../assets/images/discover/Discover1/Pasque-flower-d1.png";
import zebraimage from "../../assets/images/discover/Discover1/Zebra-bromeliad-d1.png";
// discover slide2
import harissimage2 from "../../assets/images/discover/Discover1/harris-img.png";
import capybaraimage2 from "../../assets/images/discover/Discover2/Capybara-d2.png";
import spinyimage2 from "../../assets/images/discover/Discover2/Spiny-lizard-d2.png";
import pikaimage2 from "../../assets/images/discover/Discover2/pika2.png";
import ocotilloimage2 from "../../assets/images/discover/Discover2/Ocotillo-d2.png";
import pasqueimage2 from "../../assets/images/discover/Discover2/pasque2.png";

import globalData from "./global.en";
export default {
  labTitle: "Eutrophication",
  footer:
    "Copyright © 2022 by Savvas Learning Company LLC. All Rights Reserved.",
  sectionHead: "Notebook -",
  tab1: {
    slide1: {
      heading: "",
      body: `<p>A fish farm enlists your help after many of its fish have died unexpectedly. Based on the color of their gills and the behavior of some of the live fish on the site, it seems as if some of the deaths are due to the fish suffocating while trying to gulp air at the surface. This can occur when there is not enough oxygen in the water.</p><p>Typically, small fish can survive in water with a very low dissolved oxygen content. Because both small and large fish died at this fish farm, something else could be causing the deaths other than a lack of oxygen in the water. The fish also have lesions, which indicates there is some type of toxin in the water. The fish farm thinks contaminated water was released upstream.</p><p>Your job is to test the water and fish samples to determine what caused the deaths, then use water samples from sites around the area to determine where the contaminated water could have come from.</p>`,
      audio: scenarioAudio,
      imgAlt: "A fish farm enlists",
    },
    slide2: {
      audio: exlpore2Audio,
      body: `<p>Select the microscope, slides, water samples, spectrophotometer and general lab equipment to learn more about the materials used in the lab.</p>`,
      imgAlt:
        "Select the microscope, slides, water samples, spectrophotometer and general lab equipment.",
    },
  },
  tab2: {
    slide1: {
      audio: explore1Audio,
      body: `<p>Select each of the locations to learn about conditions in that environment. Record information about each environment in your Lab Notebook.</p>`,
      imgAlt:
        "Three photographs of environments. The Denali National Park environment has short plants and snow-covered mountains. The Saguaro National Park environment has tall cactus plants, short shrubs, and sandy ground. The Yasuni National Park environment has a large body of water and many green trees.",
    },
    slide2: {
      audio: exlpore2Audio,
      body: `<p>Select each plant to learn about its traits. Record information about each plant’s traits in your Lab Notebook.</p>`,
      imgAlt:
        "Three photographs of plants. The ocotillo has wiry stems, small leaves, and flowers. The zebra bromeliad has large, striped leaves. The pasque flower has stems, leaves, and flowers covered in small hairs.",
    },
    slide3: {
      audio: explore3Audio,
      body: `<p>Select each animal to learn about its physical and behavioral traits. Record information about each animal’s traits in your Lab Notebook.</p>`,
      imgAlt:
        "Six photographs of animals. The spiny lizard has brown scales on its body. The white-bellied spider monkey is holding onto a tree branch. The Dall sheep has thick fur, long horns, and hooves. The capybara has smooth fur and a flat head. The collared pika is a small mouse-like animal that is holding plants in its mouth. The Harris’s antelope squirrel has a bushy tail and a stripe on its side.",
    },
  },
  tab3: {
    slide1: {
      button1: "Finalize Choices",
      button3: "Reset",
      audio: discover1Audio,
      body: `<p>Drag each slide to the microscope to observe each sample. There may be something in the water that can help you find out why the fish died.</p><p>Record your observations in your Lab Notebook.</p>`,
      imgAlt: "Denali National Park drop zone with -1- dropped on it.",
      defaultImg:
        "Denali National Park drop zone without any organisms dropped on it.",
      isAltText: "is",
      areAltText: "are",
      andAltText: "and",
      harissimage: harissimage,
      dallimage: dallimage,
      monkeyimage: monkeyimage,
      pikaimage: pikaimage,
      pasqueimage: pasqueimage,
      zebraimage: zebraimage,
      thisback: 1,
      draggableImg: [
        {
          id: "water_slide",
          dataType: "water_sample",
          text: "Water sample",
          label: "water sample",
          labelAlt: "water sample slide draggable",
          className: "water_sample",
        },
        {
          id: "fish_slide",
          dataType: "fish_sample",
          text: "Fish sample",
          label: "Fish sample",
          labelAlt: "fish sample slide draggable",
          className: "fish_sample",
        },
      ],
      dropzone: [
        {
          target: "slide_place",
          id: "slide_place",
          class: "slide_place",
          toastMsg: "Correct!",
          label: "drop area for slide",
          altext: "slide dropped on Droppable zone",
        },
      ],
      zoomButtonLabels: {
        zoomin: "Zoom In",
        zoomout: "Zoom Out",
      },
      zoomInCount: {
        addedZoomInMsg: "Explore map zoomed In",
        addedZoomOutMsg: "Explore map zoomed Out",
      },
    },
    slide2: {
      audio: explore3Audio,
      body: `<p>You have discovered microalgae in both the fish and water samples, which indicates that an algal bloom is in the water where the fish died.</p><p>An algal bloom is a rapid growth of microscopic algae in water, commonly caused by eutrophication. Eutrophication is the concept in which a sudden and dramatic increase in nutrients in the water, frequently due to run-off from land, causes a large amount of growth in plant life and death of animal life. In this case, there is an excess of nitrogen in the water that caused the growth of the algal bloom and the hypoxic (or low oxygen) conditions.</p>`,
      imgAlt: "discovered microalgae in both the fish and water samples.",
    },
    slide3: {
      button1: "Finalize Choices",
      // button2: "Test for Toxicity",
      button3: "Reset",
      audio: discover3Audio,
      // investigateAlertText1: "Complete. Move to the next section.",
      // investigateAlertText2:
      //   'Watch your speed in the "No Wake" zone. Reduce your engine force.',
      // investigateAlertText3: "Complete.",
      // investigateAlertText4: "You are too close to the shore!",
      body: `<p>Water samples are available from six upstream sites for analysis to determine which site has excess nitrogen in their run-off that could be causing the algal bloom. Only select three sites that are most likely to have caused the excess nitrogen in the water to test.</p><p>By running the water samples through the spectrophotometer, you will be able to determine the nitrogen concentration in each sample</p><h2><strong>Procedure:</strong></h2><ol><li>Measure a blank by placing the blank cuvette into the spectrophotometer and pressing “Blank”.</li><li>Place each sample into the spectrophotometer one at a time. Record your observations of each result in the lab notebook.</li></ol>`,
      imgAlt:
        "Water samples are available from six upstream sites for analysis to determine which site has excess nitrogen",
      defaultImg:
        "Water samples are available from six upstream sites for analysis to determine which site has excess nitrogen",
      isAltText: "is",
      areAltText: "are",
      andAltText: "and",
      capybaraimage2: capybaraimage2,
      dallimage: dallimage,
      spinyimage2: spinyimage2,
      monkeyimage: monkeyimage,
      ocotilloimage2: ocotilloimage2,
      zebraimage: zebraimage,
      thisback: 3,
      draggableImg: [
        {
          id: "drag21",
          imgSrc: capybaraimage2,
          w: "134",
          h: "90",
          source: "capybara3",
          text: "capybara",
          label: "capybara3",
          labelAlt: "the capybara",
          a11ylabel: "capybara Draggable",
          liveText: "capybara dropped in",
        },
        {
          id: "drag22",
          imgSrc: dallimage,
          w: "134",
          h: "90",
          source: "dall3",
          text: "Dall sheep",
          label: "dall3",
          labelAlt: "the Dall sheep",
          a11ylabel: "Dall sheep Draggable",
          liveText: "Dall sheep dropped in",
        },
        {
          id: "drag23",
          imgSrc: spinyimage2,
          w: "134",
          h: "90",
          source: "spiny3",
          text: "spiny lizard",
          label: "spiny3",
          labelAlt: "the spiny lizard",
          a11ylabel: "spiny lizard Draggable",
          liveText: "spiny lizard dropped in",
        },
        {
          id: "drag24",
          imgSrc: monkeyimage,
          w: "134",
          h: "90",
          source: "monkey3",
          text: "white-bellied spider monkey",
          label: "monkey3",
          labelAlt: "the white-bellied spider monkey",
          a11ylabel: "white-bellied spider monkey Draggable",
          liveText: "white-bellied spider monkeydropped in",
        },
        {
          id: "drag25",
          imgSrc: ocotilloimage2,
          w: "134",
          h: "90",
          source: "ocotillo3",
          text: "ocotillo",
          label: "ocotillo3",
          labelAlt: "the ocotillo",
          a11ylabel: "ocotillo Draggable",
          liveText: "ocotillo dropped in",
        },
        {
          id: "drag26",
          imgSrc: zebraimage,
          w: "134",
          h: "90",
          source: "zebra3",
          text: "zebra bromeliad",
          label: "zebra3",
          labelAlt: "the zebra bromeliad",
          a11ylabel: "zebra bromeliad Draggable",
          liveText: "zebra bromeliad dropped in",
        },
      ],
      dropzone: {
        commonDropZone: "",
        label: "",
        liveText: "",
      },
      commonDropZone: [
        {
          id: "commonDropZone",
          target: "commonDropZone",
          label: "",
          liveText: "",
        },
        {
          id: "commonDropZone1",
          target: "",
          label: "",
          liveText: "",
        },
      ],
      lables: [
        {
          lable: "Pipette",
          class: "pipette",
        },
        {
          lable: "Spectrophotometer",
          class: "spectrophotometer",
        },
        {
          lable: "Cuvette holder",
          class: "cuvette_holder",
        },
        {
          lable: "Waste container",
          class: "waste_container",
        },
      ],
    },
    resetLiveText: "Discover tab has been reset",
    dropzones: [
      {
        target: "A",
        id: "Dropzone1",
        toastMsg: "<b>Correct!</b>",
        label1: "upArrow",
        label: "Ship front dropzone",
        state: "upArrowCounter",
        altext1: "One up arrow dropped on ship front dropzone",
        altext2: "Two up arrow dropped on ship front dropzone",
        altext3: "Three up arrow dropped on ship front dropzone",
      },
      {
        target: "B",
        id: "Dropzone2",
        toastMsg: "<b>Correct!</b>",
        label1: "downArrow",
        label: "Ship back dropzone",
        state: "downArrowCounter",
        altext1: "One down arrow dropped on ship back dropzone",
        altext2: "Two down arrow dropped on ship back dropzone",
        altext3: "Three down arrow dropped on ship back dropzone",
      },
      {
        target: "C",
        id: "Dropzone3",
        toastMsg: "<b>Correct!</b>",
        label1: "leftArrow",
        label: "Tugboat front-left dropzone",
        state: "leftArrowUpper",
        altext1: "One left arrow dropped on tugboat front-left dropzone",
        altext2: "Two left arrow dropped on tugboat front-left dropzone",
        altext3: "Three left arrow dropped on tugboat front-left dropzone",
      },
      {
        target: "D",
        id: "Dropzone4",
        toastMsg: "<b>Correct!</b>",
        label1: "leftArrow",
        label: "Tugboat back-left dropzone",
        state: "leftArrowLower",
        altext1: "One left arrow dropped on tugboat back-left dropzone",
        altext2: "Two left arrow dropped on tugboat back-left dropzone",
        altext3: "Three left arrow dropped on tugboat back-left dropzone",
      },
      {
        target: "E",
        id: "Dropzone5",
        toastMsg: "<b>Correct!</b>",
        label1: "rightArrow",
        label: "Tugboat front-right dropzone",
        state: "rightArrowUpper",
        altext1: "One right arrow dropped on tugboat front-right dropzone",
        altext2: "Two right arrow dropped on tugboat front-right dropzone",
        altext3: "Three right arrow dropped on tugboat front-right dropzone",
      },
      {
        target: "F",
        id: "Dropzone6",
        toastMsg: "<b>Correct!</b>",
        label1: "rightArrow",
        label: "Tugboat back-right dropzone",
        state: "rightArrowLower",
        altext1: "One right arrow dropped on tugboat back-right dropzone",
        altext2: "Two right arrow dropped on tugboat back-right dropzone",
        altext3: "Three right arrow dropped on tugboat back-right dropzone",
      },
    ],
  },
  tab4: {
    slide1: {
      audio: conclude1Audio,
      body: `<p>The recommended level of nitrogen in the water to avoid algal blooms is 0.1 to 1 mg/L. Which site was the cause of the eutrophication and subsequent deaths of fish in the fish farm? What is the evidence to support your claim?</p>`,
      content:
        "1. The recommended level of nitrogen in the water to avoid algal blooms is 0.1 to 1 mg/L. Which site was the cause of the eutrophication and subsequent deaths of fish in the fish farm? What is the evidence to support your claim?",
      sectionNameForPrint: "Conclude",
      placeHolderData: "Type your answer here...",
      imgAlt:
        "1. The levels of nitrogen in the water samples each student ran are shown corresponding to the sites. Please omit the “Dissolved Oxygen” table and mapping of dissolved oxygen levels in the bay.",
    },
    slide2: {
      audio: conclude2Audio,
      body: `<p>2. Based on the purpose of the site, what was the main cause for the excess nitrogen?</p>`,
      content:
        "2. Based on the purpose of the site, what was the main cause for the excess nitrogen?",
      sectionNameForPrint: "Conclude",
      placeHolderData: "Type your answer here...",
      imgAlt: "",
    },
    slide3: {
      audio: conclude2Audio,
      body: `<p>3. Do you have any suggestions of how the site causing the problem can keep excess nitrogen from entering the water?</p>`,
      content:
        "3. Do you have any suggestions of how the site causing the problem can keep excess nitrogen from entering the water?",
      sectionNameForPrint: "Conclude",
      placeHolderData: "Type your answer here...",
      imgAlt: "",
    },
  },
  tab5: {
    slide1: {
      audio: imagineAudio,
      body: `<p><strong>Use this space to sketch your ideas and solutions.</strong></p><p><strong>Take a screenshot to save your work.</strong></p>`,
      print: "Print",
      reset: "Reset",
      addNote: "Add Note",
      sectionNameForPrint: "Imagine",
    },
  },

  labGloabalData: {
    ...globalData.labGloabalData,
    label: "Type your notes here for",
    screen: "screen",
  },
  arrowLabels: {
    upArrow: "up-arrow Draggable",
    downArrow: "down-arrow Draggable",
    leftArrow: "left-arrow Draggable",
    rightArrow: "right-arrow Draggable",
  },
  completedActivity: "-1- Completed",
  hotSpotData: [
    {
      id: "hotspot01",
      type: "right",
      title: "",
      label: "Denali National Park",
      alt: "Denali National Park",
      image: "Denali National Park",
      info: [
        "This part of Denali State Park has steep mountain slopes. The summers here are short and warm, and the winters are long and cold, reaching low temperatures of −22°C. It is also very dry, receiving very little snow or rain. The plants in this area are mainly shrubs and smaller plants that can survive in the cold, dry environment.",
      ],
      showCloseButton: true,
      audio: explore11Audio,
    },
    {
      id: "hotspot02",
      type: "right",
      title: "",
      label: "Saguaro National Park",
      alt: "Saguaro National Park",
      image: "Saguaro National Park",
      info: [
        "This part of Saguaro National Park has warm winters and very hot summers. This area receives very little precipitation. For most of the year, the humidity is near 0%, so the air is very dry. The plants in this area include many types of cacti and shrubs that can survive in the hot, dry environment.",
      ],
      showCloseButton: true,
      audio: explore12Audio,
    },
    {
      id: "hotspot03",
      type: "right",
      label: "Yasuni National Park",
      alt: "Yasuni National Park",
      image: "Yasuni National Park",
      title: "",
      info: [
        "The temperature in Yasuni National Park park is relatively warm and does not change much throughout the year. This area receives a lot of precipitation as rain, and multiple rivers flow through the region. Many different types of plants grow in this area, including very tall trees.",
      ],
      showCloseButton: true,
      audio: explore13Audio,
    },
  ],
  hotSpotData31_old: [
    {
      id: "hotspot11",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Great job! The organisms you chose have traits that help them survive in this environment. The collared pika’s thick fur, small body, and foraging behavior helps it survive in the cold winters. The Dall sheep’s furry coat helps it stay warm, and its two-toed hooves help it grip steep mountain slopes. The pasque flower’s short height and hairlike structures protect it from cold winds.",
      ],
      showCloseButton: true,
      audio: discover11Audio,
    },
    {
      id: "hotspot12",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Try again. Not all of these organisms will survive in this environment. Remember that this area is cold, dry, and has steep mountain slopes. Review the organisms’ traits and keep adjusting your choices so that all the organisms will survive here.",
      ],
      showCloseButton: true,
      audio: discover12Audio,
    },
  ],
  hotSpotData32: [
    {
      id: "hotspot210",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Great job! The organisms you chose have traits that help them survive in this environment. The squirrel’s and lizard’s coloring help them blend in with the environment, and their behaviors help them stay cool in the heat. The ocotillo plant’s long, shallow roots help it capture water from infrequent rainfalls, and its small, waxy leaves prevent water loss.",
      ],
      showCloseButton: true,
      audio: discover21Audio,
    },
    {
      id: "hotspot220",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Try again. Not all of these organisms will survive in this environment. Remember that this area is hot, dry, and receives very little rainfall. Review the organisms’ traits and keep adjusting your choices so that all the organisms will survive here.",
      ],
      showCloseButton: true,
      audio: discover22Audio,
    },
  ],
  hotSpotData33_old: [
    {
      id: "hotspot310",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Great job! The organisms you chose have traits that help them survive in this environment. The capybara’s webbed feet help it move through water, and the shape of its head helps it see and breathe while most of its body is underwater. The spider monkey’s traits help it climb trees and find food. The zebra bromeliad’s waxy leaves help it capture water, and its roots help it grow on tall trees so it can collect sunlight.",
      ],
      showCloseButton: true,
      audio: discover31Audio,
    },
    {
      id: "hotspot320",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Try again. Not all of these organisms will survive in this environment. Remember that this environment is warm, humid, and receives a lot of rainfall. There are also many types of plants, including tall trees. Review the organisms’ traits and keep adjusting your choices so that all the organisms will survive here.",
      ],
      showCloseButton: true,
      audio: discover32Audio,
    },
  ],
  hotSpotData1: [
    {
      id: "hotspot21",
      type: "right",
      title: "",
      label: "ocotillo",
      alt: "ocotillo",
      image: "ocotillo",
      info: [
        `<p>The ocotillo has: <ul><li>a wide, shallow root system that captures water from quick rainstorms</li><li> small, waxy leaves that reduce water loss</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore21Audio,
    },
    {
      id: "hotspot22",
      type: "right",
      title: "",
      label: "zebra bromeliad",
      alt: "zebra bromeliad",
      image: "zebra bromeliad",
      info: [
        `<p>The zebra bromeliad has: <ul><li>roots that can grip onto trees to help the plant reach sunlight</li><li>thick, waxy leaves arranged in a cup shape that captures water</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore22Audio,
    },
    {
      id: "hotspot23",
      type: "right",
      label: "pasque flower",
      alt: "pasque flower",
      image: "pasque flower",
      title: "",
      info: [
        `<p>The pasque flower has: <ul><li>short stems that keep the plant close to the ground and protect it from the cold</li><li>fine hairs on the outside of the plant that protect it from the cold
        </li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore23Audio,
    },
  ],
  hotSpotData2: [
    {
      id: "hotspot31",
      type: "right",
      title: "",
      label: "spiny lizard",
      alt: "spiny lizard",
      image: "spiny lizard",
      info: [
        `<p>This type of spiny lizard <ul><li>has a brown speckled coloring that matches the color of its environment</li><li>seeks shelter in shady areas or underground to keep cool during the hottest part of the day</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore31Audio,
    },
    {
      id: "hotspot32",
      type: "right",
      title: "",
      label: "white-bellied spider monkey",
      alt: "white-bellied spider monkey",
      image: "white-bellied spider monkey",
      info: [
        `<p>The white-bellied spider monkey<ul><li>has a long tail and fingers that can grasp tree branches</li><li>feeds on fruits and seeds from trees</li><li>shakes tree branches to scare away enemies</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore32Audio,
    },
    {
      id: "hotspot33",
      type: "right",
      label: "Dall sheep",
      alt: "Dall sheep",
      image: "Dall sheep",
      title: "",
      info: [
        `<p>The Dall sheep<ul><li>has a thick, furry coat with hollow hairs that protect it from the cold</li><li>has two-toed, spread-out hooves that can grip rough uneven ground</li><li>eats mainly grasses and small shrubs</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore33Audio,
    },
    {
      id: "hotspot34",
      type: "right",
      title: "",
      label: "capybara",
      alt: "capybara",
      image: "capybara",
      info: [
        `<p>The capybara<ul><li>has webbed feet that make moving through water easier</li><li>has its eyes, ears, and nose on top of its head, so it can breathe and see while mostly underwater</li><li>feeds mainly on grasses and aquatic plants</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore34Audio,
    },
    {
      id: "hotspot35",
      type: "right",
      title: "",
      label: "collared pika",
      alt: "collared pika",
      image: "collared pika",
      info: [
        `<p>The collared pika<ul><li>has thick fur and a small round body that retains heat</li><li>eats grasses, weeds, and wildflowers</li><li>saves up food during summer, lays the food out in the sun, and places the food in its den for winter</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore35Audio,
    },
    {
      id: "hotspot36",
      type: "right",
      label: "Harris's antelope squirrel ",
      alt: "Harris's antelope squirrel ",
      image: "Harris's antelope squirrel ",
      title: "",
      info: [
        `<p>The Harris’s antelope squirrel<ul><li>has grayish-brown fur that matches the color of its environment</li><li>moves to a shaded area and lays flat on the ground to keep cool in the heat</li><li>holds its tail over its head like an umbrella to keep cool</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore36Audio,
    },
  ],
  hotSpotDataIntroduce: [
    {
      id: "hotspotIntroduce1",
      type: "right",
      title: "",
      label: "Microscope",
      alt: "Microscope",
      image: "microscope",
      info: [
        `<p>Scientists use microscopes to study structures that are too small to see with the naked eye, such as most cells. In this lab, you will use a light microscope, which is the most common type of microscope</p>`,
      ],
      showCloseButton: true,
      audio: explore31Audio,
    },
    {
      id: "hotspotIntroduce2",
      type: "right",
      title: "",
      label: "Slides",
      alt: "Slides",
      image: "slides",
      info: [
        `<p>Observe as the slides of the water sample and the fish sample are made. The water sample is taken from the water at the fish farm, and the fish lesion sample is taken from a dead fish from the fish farm. Based on what you see on the slides, you may be able to determine the cause of the deaths at the fish farm.</p>`,
      ],
      showCloseButton: true,
      audio: explore32Audio,
    },
    {
      id: "hotspotIntroduce3",
      type: "right",
      label: "Water Samples",
      alt: "Water Samples",
      image: "water_samples",
      title: "",
      info: [
        `<p>A scientist has collected water samples from the fish farm and from some upstream sites for you to test. You will use the spectrophotometer to find the nitrogen content in the water at the upstream sites to determine which site most likely was the cause of the deaths at the fish farm.</p>`,
      ],
      showCloseButton: true,
      audio: explore33Audio,
    },
    {
      id: "hotspotIntroduce4",
      type: "right",
      title: "",
      label: "Spectrophotometer",
      alt: "Spectrophotometer",
      image: "spectrophotometer",
      info: [
        `<p>A spectrophotometer is an instrument that uses the intensity of light that passes through a solution to determine the concentration of a molecule in the solution. In this lab, the spectrophotometer will be measuring the amount of nitrogen in each of the water samples.</p>`,
      ],
      showCloseButton: true,
      audio: explore34Audio,
    },
    {
      id: "hotspotIntroduce5",
      type: "right fullscreen",
      title: "",
      label: "Universal Lab Equipment",
      alt: "Universal Lab Equipment",
      image: "universal_lab_equipment",
      info: [
        `<p>A pipette is an instrument used to pick up very precise amounts of liquid. It is very important that each time the pipette is used, a sterile tip is used in order to avoid cross-contamination, which would ruin the samples. In between each sample, be sure to dispose of the old pipette tips in the waste container and pick up a new one.</p>`,
      ],
      showCloseButton: true,
      audio: explore35Audio,
    },
    {
      id: "hotspotIntroduce5",
      type: "left fullscreen",
      clsName: "earth_concrete",
      isVideo: true,
      src: earthConcreteVideo,
      posterImg: earth_concreteImg,
      autoplay: true,
      showCloseButton: false,
      imgAlt: `An earthquake shakes a two-story concrete home. Starting at the roof, the entire house breaks apart during the shaking. Only a pile of rubble is left after the shaking stops.
          Select Reset to start over and test a new model home.`,
      ariaLabel: `An earthquake shakes a two-story concrete home. Starting at the roof, the entire house breaks apart during the shaking. Only a pile of rubble is left after the shaking stops.
          Select Reset to start over and test a new model home.`,
    },
  ],
  hotSpotData31: [
    {
      id: "hotspot_water_sample",
      type: "right",
      title: "",
      label: "The water slide",
      alt: "The water slide",
      image: "",
      info: [
        `<p>The water slide is full of a microalgae called Pfiesteria piscicida. Microalgae are very small unicellular organisms that form colonies that then become visible to the naked eye.</p><p>When there are too many nutrients in the water, microalgae can overgrow and create an algal bloom that performs so much photosynthesis that it uses oxygen in the water. Some algal blooms, known as harmful algal blooms, also produce toxins. When the algal bloom eventually dies, oxygen in the water is consumed, making it difficult for fish and other plants to survive.</p>`,
      ],
      showCloseButton: false,
      audio: discover11Audio,
    },
    {
      id: "hotspot_fish_sample",
      type: "right",
      title: "",
      label: "The fish slide",
      alt: "The fish slide",
      image: "",
      info: [
        `<p>The fish slide is full of microalgae called Pfiesteria piscicida. This microalgae is normally non-toxic; however, environmental changes can cause it to excrete toxins. The toxin breaks down skin tissue, so it is safe to assume that this microalgae is what caused the lesion.</p>`,
      ],
      showCloseButton: false,
      audio: discover11Audio,
    },
  ],
  hotSpotData33: [
    {
      id: "water_level_map",
      type: "right",
      label: "Map",
      alt: "water leve check map",
      title: "",
      image: "water_level_map",
      info: [
        `<p>You have discovered microalgae in both the fish and water samples, which indicates that an algal bloom is in the water where the fish died.</p><p>An algal bloom is a rapid growth of microscopic algae in water, commonly caused by eutrophication. Eutrophication is the concept in which a sudden and dramatic increase in nutrients in the water, frequently due to run-off from land, causes a large amount of growth in plant life and death of animal life. In this case, there is an excess of nitrogen in the water that caused the growth of the algal bloom and the hypoxic (or low oxygen) conditions.</p><p>Now that we know an algal bloom is present, we need to determine where the excess nitrogen is coming from.</p>`,
      ],
      showCloseButton: true,
      audio: discover31Audio,
    },
  ],

  notebook: {
    addPageTitle: "A new page has been added",
    deletePageTitle: "A page has been deleted",
    page1: {},
    page2: {
      text1: `<p>1. Record your observations of the water sample viewed under the microscope.</p>`,
      text2: `<p>2. Record your observations of the fish tissue sample viewed under the microscope.</p>`,
      content:
        "1. Record your observations of the water sample viewed under the microscope.",
      content2:
        "2. Record your observations of the fish tissue sample viewed under the microscope.",
    },
    page3: {
      text1: `<p>3. Which site do you hypothesize is the cause of the excess nitrogen in the water at the fish farm?</p>`,
      content:
        "3. Which site do you hypothesize is the cause of the excess nitrogen in the water at the fish farm?",
    },
    page4: {
      text1: `<p>4. Record the values of the nitrogen concentration in the water at each upstream site.</p>`,
      content:
        "4. Record the values of the nitrogen concentration in the water at each upstream site.",
      caption:
        "4. Record the values of the nitrogen concentration in the water at each upstream site.",
      columnHeading: JSON.stringify(["Site", "Nitrogen Concentration (mg/L)"]),
      rowData: JSON.stringify([
        { val1: "Cotton Field", val2: "" },
        { val1: "Cookie Factory", val2: "" },
        { val1: "Cow Farm", val2: "" },
      ]),
    },
    page5: {},
  },
  notebookData: [
    {
      title: "Introduce",
      screenshote: "Introduce Screenshot",
    },
    {
      title: "Explore",
      screenshote: "Explore Screenshot",
      "Page - 1": "Page - 1",
      "Page - 2": "Page - 2",
      "Page - 3": "Page - 3",
    },
    {
      title: "Conclude",
      screenshote: "Conclude Screenshot",
    },
  ],

  tabs: [
    {
      title: "Introduce",
      component: "IntroduceContainer",
      numberOfSubTab: 2,
      footerButtonText: "Next",
      className: "remove-outline",
      isCompleted: true,
      subTabLength: 2,
    },
    {
      title: "Explore",
      component: "ConcludeContainer",
      numberOfSubTab: 3,
      footerButtonText: "Next",
      isCompleted: false,
      subTabLength: 3,
    },
    {
      title: "Conclude",
      component: "ViewFourContainer",
      numberOfSubTab: 3,
      footerButtonText: "Next",
      isCompleted: false,
      subTabLength: 3,
    },
  ],
  buttonsLable: {
    reset: "Reset",
    submit: "Submit",
    start: "Start",
    stop: "Stop",
    save: "Save",
    help: "Help",
    labNotebook: "Lab Notebook",
    skipToMain: "Skip to Main Content",
    play: "Audio Play",
    pause: "Audio Pause",
    replay: "Audio Replay",
    hamburger: "more options",
    Test: "Test",
  },
  commonWords: {
    selected: "selected",
  },
};
