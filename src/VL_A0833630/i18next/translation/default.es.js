import introduceAudio1 from "../../assets/audios/en/lab5audio/Scenario.mp3";
import explore1 from "../../assets/audios/en/Explore1.mp3";
import explore2 from "../../assets/audios/en/Explore2.mp3";
import explore1battery from "../../assets/audios/en/Explore1BatteryPopup.mp3";
import explore1bulb from "../../assets/audios/en/Explore1BulbPopup.mp3";
import explore1flowofelectric from "../../assets/audios/en/Explore1FlowofElectricalEnergyPopup.mp3";
import explore1switch from "../../assets/audios/en/Explore1SwitchPopup.mp3";
import explore1wire from "../../assets/audios/en/Explore1WirePopup.mp3";
import explore2battery from "../../assets/audios/en/Explore2BatteryPopup.mp3";
import explore2board from "../../assets/audios/en/Explore2BoardPopup.mp3";
import explore2bulb from "../../assets/audios/en/Explore2BulbPopup.mp3";
import explore2buzzer from "../../assets/audios/en/Explore2BuzzerPopup.mp3";
import explore2motor from "../../assets/audios/en/Explore2MotorPopup.mp3";
import explore2switch from "../../assets/audios/en/Explore2SwitchPopup.mp3";
import explore2wire from "../../assets/audios/en/Explore2WirePopup.mp3";
import explore2heatelement from "../../assets/audios/en/Explore2HeatingElementPopup.mp3";
import discover1 from "../../assets/audios/en/Discover.mp3";
import discover1pass from "../../assets/audios/en/DiscoverTestPassPopup.mp3";
import discover1fail from "../../assets/audios/en/DiscoverTestFailPopup.mp3";
import concludeAudio1 from "../../assets/audios/en/Conclude1.mp3";
import concludeAudio2 from "../../assets/audios/en/Conclude2.mp3";
import imagineAudio from "../../assets/audios/en/lab5audio/Imagine.mp3";
// import React from "react";
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
// import explore4b from "../../assets/audios/Explore4b.mp3";
// import explore4a from "../../assets/audios/Explore4a.mp3";
import globalData from "./global.en";
// import Videomp4 from "../../assets/videos/Discover_03.mp4";
export default {
  labTitle: "Rasgos y Supervivencia",
  footer:
    "Copyright © 2022 by Savvas Learning Company LLC. All Rights Reserved.",
  sectionHead: "Notebook -",
  tab1: {
    slide1: {
      heading: "",
      body: `<p>This pizza oven uses electrical energy to move and heat a pizza. When the pizza is cooked, a buzzer sounds and a bulb lights up, letting you know your food is ready.</p>
      <p>Your challenge is to build a circuit that transforms electrical energy into thermal energy, light energy, motion, and sound energy in a pizza oven. You must build a circuit that has two separate paths: one for the heating and rotation elements, and one that controls light and sound. Once you build your circuit, it will be placed in a pizza oven and sent to a customer!</p>
      <p>Answer the questions for this section in your Lab Notebook.</p>`,
      audio: introduceAudio1,
      imgAlt:
        "A pizza oven with a pizza in it. The top of the oven is a circular structure with switches on it. The top of the oven is connected by a vertical structure to a circular cooking platform. A pizza is on the cooking platform. There is an electrical wire coming out of the side of the pizza oven.",
    },
  },
  tab2: {
    slide1: {
      audio: explore1,
      body: `<p>Circuits need to have certain parts to be complete. When the parts are arranged to form a complete path, electrical energy can flow and change into different forms. Select the parts of the circuit to learn more about them.</p>
      <p>Record the main parts of a circuit in your Lab Notebook and write the functions of these parts.</p>`,
      imgAlt:
        "A diagram of an electrical circuit. A wire connects a battery to a switch. Another wire connects the switch to a bulb. Another wire connects the bulb to the battery. Arrows show the flow of electrical energy, which flows from the battery to the switch, then from the switch to the bulb, then from the bulb to the battery.",
    },
    slide2: {
      audio: explore2,
      body: `<p>Click on each part of the circuit to learn more about how you will build your circuit.</p>
      <p>Write notes in your Lab Notebook about how you can use the parts provided to convert electrical energy into other forms.</p>`,
      imgAlt:
        "A board with holes in it and parts that can be added to the board. There are six columns and four rows of holes in the board. The parts that can be added to the board include a battery, switch, wire, bulb, motor, buzzer, and heating element.",
    },
    slide3: {
      audio: explore2,
      body: `<p>Click on each part of the circuit to learn more about how you will build your circuit.</p>
      <p>Write notes in your Lab Notebook about how you can use the parts of a circuit to transform electrical energy into other forms.</p>`,
      imgAlt:
        "A board with holes in it and parts that can be added to the board. There are six columns and four rows of holes in the board. The parts that can be added to the board include a battery, switch, wire, bulb, motor, buzzer, and heating element.",
    },
  },
  tab3: {
    slide1: {
      button1: "Finalize Choices",
      // button2: "Test for Toxicity",
      button3: "Reset",
      audio: discover1,
      // investigateAlertText1: "Complete. Move to the next section.",
      // investigateAlertText2:
      //   'Watch your speed in the "No Wake" zone. Reduce your engine force.',
      // investigateAlertText3: "Complete.",
      // investigateAlertText4: "You are too close to the shore!",
      body: `<p>Select organisms with traits that would help them survive in the Denali National Park environment.
       Place the organisms on the image and select “Finalize Choices.”</p><p>Once you have selected the correct 
       organisms, record in your Lab Notebook how the organisms’ traits help them survive in this environment.</p>`,
      imgAlt: "Discover Image",
      harissimage: harissimage,
      dallimage: dallimage,
      monkeyimage: monkeyimage,
      pikaimage: pikaimage,
      pasqueimage: pasqueimage,
      zebraimage: zebraimage,
      thisback: 1,
      draggableImg: [
        {
          id: "drag1",
          imgSrc: harissimage,
          w: "134",
          h: "90",
          source: "hariss",
          text: "Harris's antelope squirrel",
          label: "hariss",
          a11ylabel: "hariss's antelope Draggable",
          liveText: "hariss's antelope dropped in",
        },
        {
          id: "drag2",
          imgSrc: dallimage,
          w: "134",
          h: "90",
          source: "dall",
          text: "Dall sheep",
          label: "dall",
          a11ylabel: "dall sheep Draggable",
          liveText: "dall sheep dropped in",
        },
        {
          id: "drag3",
          imgSrc: monkeyimage,
          w: "134",
          h: "90",
          source: "monkey",
          text: "white-bellied spider monkey",
          label: "monkey",
          a11ylabel: "white-bellied spider monkey Draggable",
          liveText: "white-bellied spider monkeydropped in",
        },
        {
          id: "drag4",
          imgSrc: pikaimage,
          w: "134",
          h: "90",
          source: "pika",
          text: "collared pika",
          label: "pika",
          a11ylabel: "collared pika Draggable",
          liveText: "collared pika dropped in",
        },
        {
          id: "drag5",
          imgSrc: pasqueimage,
          w: "134",
          h: "90",
          source: "pasque",
          text: "pasque flower",
          label: "pasque",
          a11ylabel: "pasque flower Draggable",
          liveText: "pasque flower dropped in",
        },
        {
          id: "drag6",
          imgSrc: zebraimage,
          w: "134",
          h: "90",
          source: "zebra",
          text: "zebra bromeliad",
          label: "zebra",
          a11ylabel: "zebra Draggable",
          liveText: "zebra dropped in",
        },
      ],
      dropzone: {
        commonDropZone: "common drop zone",
        label: "common drop zone",
        liveText: "Poster dropzone",
      },
      commonDropZone: [
        {
          id: "commonDropZone",
          target: "commonDropZone",
          label: "Poster common dropzone",
          liveText: "Poster common dropzone",
        },
        {
          id: "commonDropZone1",
          target: "commonDropZone1",
          label: "Poster common dropzone",
          liveText: "Poster common dropzone",
        },
      ],
    },
    slide2: {
      button1: "Finalize Choices",
      // button2: "Test for Hoof Damage",
      button3: "Reset",
      audio: discover1,
      // investigateAlertText1: "Complete. Move to the next section.",
      // investigateAlertText2:
      //   'Watch your speed in the "No Wake" zone. Reduce your engine force.',
      // investigateAlertText3: "Complete.",
      // investigateAlertText4: "You are too close to the shore!",
      body: `<p>Select organisms with traits that would help them survive in the Saguaro National Park environment.
       Place the organisms on the image and select “Finalize Choices.”</p><p>Once you have selected the correct 
       organisms, record notes about your choices. For correct choices, record how the organisms’ traits help them survive in this environment.</p>`,
      imgAlt: "Discover Image",
      harissimage2: harissimage2,
      capybaraimage2: capybaraimage2,
      spinyimage2: spinyimage2,
      pikaimage2: pikaimage2,
      pasqueimage2: pasqueimage2,
      ocotilloimage2: ocotilloimage2,
      thisback: 2,
      draggableImg: [
        {
          id: "drag11",
          imgSrc: capybaraimage2,
          w: "134",
          h: "90",
          source: "capybara",
          text: "capybara",
          label: "capybara",
          a11ylabel: "capybara Draggable",
          liveText: "capybara dropped in",
        },
        {
          id: "drag12",
          imgSrc: pikaimage2,
          w: "134",
          h: "90",
          source: "pika2",
          text: "collared pika",
          label: "pika2",
          a11ylabel: "collared pika Draggable",
          liveText: "collared pika dropped in",
        },
        {
          id: "drag13",
          imgSrc: harissimage2,
          w: "134",
          h: "90",
          source: "harris2",
          text: "Harris's antelope squirrel",
          label: "harris2",
          a11ylabel: "Harris's antelope squirrel Draggable",
          liveText: "Harris's antelope squirrel dropped in",
        },
        {
          id: "drag14",
          imgSrc: spinyimage2,
          w: "134",
          h: "90",
          source: "spiny",
          text: "spiny lizard",
          label: "spiny",
          a11ylabel: "spiny lizard Draggable",
          liveText: "spiny lizard dropped in",
        },
        {
          id: "drag15",
          imgSrc: ocotilloimage2,
          w: "134",
          h: "90",
          source: "ocotillo",
          text: "ocotillo",
          label: "ocotillo",
          a11ylabel: "ocotillo Draggable",
          liveText: "ocotillo dropped in",
        },
        {
          id: "drag16",
          imgSrc: pasqueimage2,
          w: "134",
          h: "90",
          source: "pasque2",
          text: "pasque flower",
          label: "pasque2",
          a11ylabel: "pasque flower Draggable",
          liveText: "pasque flower dropped in",
        },
      ],
      dropzone: {
        commonDropZone: "common drop zone",
        label: "common drop zone",
        liveText: "Poster dropzone",
      },
      commonDropZone: [
        {
          id: "commonDropZone",
          target: "commonDropZone",
          label: "Poster common dropzone",
          liveText: "Poster common dropzone",
        },
        {
          id: "commonDropZone1",
          target: "commonDropZone1",
          label: "Poster common dropzone",
          liveText: "Poster common dropzone",
        },
      ],
    },
    slide3: {
      button1: "Finalize Choices",
      // button2: "Test for Toxicity",
      button3: "Reset",
      audio: discover1,
      // investigateAlertText1: "Complete. Move to the next section.",
      // investigateAlertText2:
      //   'Watch your speed in the "No Wake" zone. Reduce your engine force.',
      // investigateAlertText3: "Complete.",
      // investigateAlertText4: "You are too close to the shore!",
      body: `<p>Select organisms with traits that would help them survive in the Yasuni National Park environment. Place the organisms on the image and select “Finalize Choices.”
              </p><p>Once you have selected the correct organisms, record notes about your choices. For correct choices, record how the organisms’ traits help them survive in this environment.</p>`,
      imgAlt: "Discover Image",
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
          a11ylabel: "dall sheep Draggable",
          liveText: "dall sheep dropped in",
        },
        {
          id: "drag23",
          imgSrc: spinyimage2,
          w: "134",
          h: "90",
          source: "spiny3",
          text: "spiny lizard",
          label: "spiny3",
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
          a11ylabel: "zebra Draggable",
          liveText: "zebra dropped in",
        },
      ],
      dropzone: {
        commonDropZone: "common drop zone",
        label: "common drop zone",
        liveText: "Poster dropzone",
      },
      commonDropZone: [
        {
          id: "commonDropZone",
          target: "commonDropZone",
          label: "Poster common dropzone",
          liveText: "Poster common dropzone",
        },
        {
          id: "commonDropZone1",
          target: "commonDropZone1",
          label: "Poster common dropzone",
          liveText: "Poster common dropzone",
        },
      ],
    },
    resetLiveText: "Se ha reiniciado la pestaña Descubrir.",
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
      audio: concludeAudio1,
      body: `<p>1. Explain how the parts on each path of the circuit converted energy to other forms.</p>`,
      content:
        "1. Explain how the parts on each path of the circuit converted energy to other forms.",
      sectionNameForPrint: "Conclude",
      placeHolderData: "Type your answer here...",
      imgAlt: "A diagram showing a bulb, heating element, buzzer, and motor.",
    },
    slide2: {
      audio: concludeAudio2,
      body: `<p>2. Explain why the circuit in the pizza oven needed two separate paths in order for the oven to work correctly.</p>`,
      content:
        "2. Explain why the circuit in the pizza oven needed two separate paths in order for the oven to work correctly.",
      sectionNameForPrint: "Conclude",
      placeHolderData: "Type your answer here...",
      imgAlt:
        "A pizza oven with a pizza in it. The top of the oven is a circular structure with switches on it. The top of the oven is connected by a vertical structure to a circular cooking platform. A pizza is on the cooking platform. There is an electrical wire coming out of the side of the pizza oven.",
    },
  },
  tab5: {
    slide1: {
      audio: imagineAudio,
      body: `<p>In your Lab Notebook, write another design challenge you could meet using a circuit. 
      For example, “I need a circuit that has two buzzers on one path, two lights on another path, 
      and two motors on a third path. Each path needs a separate switch.”</p><p>
      Then imagine a circuit design that would meet the challenge. 
      Describe the design in your Lab Notebook. 
      You can also draw your design and take a screenshot for your Lab Notebook.</p>`,
      // imgAlt: "Imagine Image",
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
  notebook: {
    addPageTitle: "A new Página has been added",
    deletePageTitle: "A Página has been deleted",
    Page1: {
      text1: `<p>1. What is your challenge in this activity?</p>`,
      text2: `<p>2. What do you already know about this topic?</p>`,
      content1: "1. What is your challenge in this activity?",
      content2: "2. What do you already know about this topic?",
    },
    Page2: {
      text1: `<p>3. Record information about the different environments.</p>`,
      content: "3. Record information about the different environments.",
    },
    Page3: {
      text1: `<p>4. Record information about the plants’ traits.</p>`,
      content: "4. Record information about the plants’ traits.",
    },
    Page4: {
      text1: `<p>5. Record information about the animals’ traits.</p>`,
      content: "5. Record information about the animals’ traits.",
    },
    Page5: {
      text1: `<p>6. Record notes about how the organisms’ traits help them survive in the Denali State Park environment.</p>`,
      content:
        "6. Record notes about how the organisms’ traits help them survive in the Denali State Park environment.",
    },
    Page6: {
      text1: `<p>7. Record notes about how the organisms’ traits help them survive in the Saguaro National Park environment.</p>`,
      content:
        "7. Record notes about how the organisms’ traits help them survive in the Saguaro National Park environment.",
    },
    Page7: {
      text1: `<p>8. Record notes about how the organisms’ traits help them survive in the Yasuni National Park environment.</p>`,
      content:
        "8. Record notes about how the organisms’ traits help them survive in the Yasuni National Park environment.",
    },
    Page8: {},
    Page9: {
      text1: `<p>9. Describe an environment that would be well suited for the wood stork, river otter, and common cattail. Then explain how at least one trait of each organism helps it survive in its environment.</p>`,
      content1:
        "9. Describe an environment that would be well suited for the wood stork, river otter, and common cattail. Then explain how at least one trait of each organism helps it survive in its environment.",
    },
  },
  arrowLabels: {
    upArrow: "up-arrow Draggable",
    downArrow: "down-arrow Draggable",
    leftArrow: "left-arrow Draggable",
    rightArrow: "right-arrow Draggable",
  },
  completedActivity: "-1- Completar",
  hotSpotData: [
    {
      id: "hotspot01",
      type: "right",
      title: "",
      label: "Switch",
      alt: "Switch",
      image: "switch",
      info: [
        "A switch can be open or closed and affects the flow of electrical energy in a circuit. When the switch is open, electrical energy will not flow to the bulb, and the bulb will not light up. When the switch is closed and the path is complete, electrical energy will flow to the bulb, and the bulb will light up. ",
      ],
      showCloseButton: true,
      audio: explore1bulb,
    },
    {
      id: "hotspot02",
      type: "right",
      title: "",
      label: "Bulb",
      alt: "Bulb",
      image: "bulb",
      info: ["A bulb transforms electrical energy to light energy."],
      showCloseButton: true,
      audio: explore1switch,
    },
    {
      id: "hotspot03",
      type: "right",
      label: "Battery",
      alt: "Battery",
      image: "battery",
      title: "",
      info: [
        "A battery provides chemical energy, which is transformed to electrical energy in the circuit. ",
      ],
      showCloseButton: true,
      audio: explore1bulb,
    },
  ],
  hotSpotData31: [
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
      audio: explore1battery,
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
      audio: explore1bulb,
    },
  ],
  hotSpotData32: [
    {
      id: "hotspot21",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Great job! The organisms you chose have traits that help them survive in this environment. The squirrel’s and lizard’s coloring help them blend in with the environment, and their behaviors help them stay cool in the heat. The ocotillo plant’s long, shallow roots help it capture water from infrequent rainfalls, and its small, waxy leaves prevent water loss.",
      ],
      showCloseButton: true,
      audio: explore1battery,
    },
    {
      id: "hotspot22",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Try again. Not all of these organisms will survive in this environment. Remember that this area is hot, dry, and receives very little rainfall. Review the organisms’ traits and keep adjusting your choices so that all the organisms will survive here.",
      ],
      showCloseButton: true,
      audio: explore1bulb,
    },
  ],
  hotSpotData33: [
    {
      id: "hotspot31",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Great job! The organisms you chose have traits that help them survive in this environment. The capybara’s webbed feet help it move through water, and the shape of its head helps it see and breathe while most of its body is underwater. The spider monkey’s traits help it climb trees and find food. The zebra bromeliad’s waxy leaves help it capture water, and its roots help it grow on tall trees so it can collect sunlight.",
      ],
      showCloseButton: true,
      audio: explore1bulb,
    },
    {
      id: "hotspot32",
      type: "right",
      label: "Finalize choice",
      alt: "Finalize choice",
      title: "",
      image: "Finalize choice",
      info: [
        "Try again. Not all of these organisms will survive in this environment. Remember that this environment is warm, humid, and receives a lot of rainfall. There are also many types of plants, including tall trees. Review the organisms’ traits and keep adjusting your choices so that all the organisms will survive here.",
      ],
      showCloseButton: true,
      audio: explore1battery,
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
      audio: explore2wire,
    },
    {
      id: "hotspot22",
      type: "right",
      title: "",
      label: "zebra bromeliad",
      alt: "zebra bromeliad",
      image: "zebra bromeliad",
      info: [
        `<p>The zebra bromeliad has: <ul><li>roots that can grip onto trees to help plant reach sunlight</li><li>thick, waxy leaves arranged in a cup shape that captures water</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore2board,
    },
    {
      id: "hotspot23",
      type: "right",
      label: "pasque flower",
      alt: "pasque flower",
      image: "pasque flower",
      title: "",
      info: [
        `<p>The pasque flower has: <ul><li>short stems that keep plant close to ground and protect it from cold</li><li>fine hairs on outside of plant that protect it from cold
        </li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore2wire,
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
        `<p>This type of spiny lizard <ul><li>has a brown speckled coloring that matches color of environment</li><li>seeks shelter in shady areas or underground to keep cool during hottest part of day</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore2wire,
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
      audio: explore2switch,
    },
    {
      id: "hotspot33",
      type: "right",
      label: "Dall sheep",
      alt: "Dall sheep",
      image: "Dall sheep",
      title: "",
      info: [
        `<p>The Dall sheep<ul><li>has thick, furry coat with hollow hairs that protect from cold</li><li>has two-toed, spread-out hooves that can grip rough uneven ground</li><li>eats mainly grasses and small shrubs</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore2board,
    },
    {
      id: "hotspot34",
      type: "right",
      title: "",
      label: "capybara",
      alt: "capybara",
      image: "capybara",
      info: [
        `<p>The capybara<ul><li>has webbed feet that make moving through water easier</li><li>has eyes, ears, and nose on top of head, so animal can breathe and see while body is mostly underwater
        has eyes, ears, and nose on top of head, so animal can breathe and see while body is mostly underwater</li><li>feeds mainly on grasses and aquatic plants</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore2wire,
    },
    {
      id: "hotspot35",
      type: "right",
      title: "",
      label: "collared pika",
      alt: "collared pika",
      image: "collared pika",
      info: [
        `<p>The collared pika<ul><li>has thick fur and small round body that retains heat</li><li>eats grasses, weeds, and wildflowers</li><li>saves up food during summer, lays food out in sun, places food in den for winter</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore2board,
    },
    {
      id: "hotspot36",
      type: "right",
      label: "Harris's antelope squirrel ",
      alt: "Harris's antelope squirrel ",
      image: "Harris's antelope squirrel ",
      title: "",
      info: [
        `<p>The Harris’s antelope squirrel<ul><li>has grayish-brown fur that matches color of environment</li><li>moves to a shaded area and lays flat on the ground to keep cool in the heat</li><li>holds tail over head like an umbrella to keep cool in the heat</li></ul></p>`,
      ],
      showCloseButton: true,
      audio: explore2wire,
    },
  ],

  notebookData: [
    {
      title: "Escenario",
      screenshote: "Captura de pantalla del escenario",
    },
    {
      title: "Explorar",
      screenshote: "Explorar captura de pantalla",
      "Página - 1": "Página - 1",
      "Página - 2": "Página - 2",
      "Página - 3": "Página - 3",
    },
    {
      title: "Descubrir",
      screenshote: "Descubrir Captura de pantalla",
      "Página - 1": "Página - 1",
      "Página - 2": "Página - 2",
      "Página - 3": "Página - 3",
    },
    {
      title: "Concluir",
      screenshote: "Concluir captura de pantalla",
    },
    {
      title: "Imagina",
      screenshote: "Imagina captura de pantalla",
    },
  ],

  tabs: [
    {
      title: "Escenario",
      component: "IntroduceContainer",
      numberOfSubTab: 0,
      footerButtonText: "Siguiente",
      className: "remove-outline",
      isCompleted: true,
      subTabLength: 1,
    },
    {
      title: "Explorar",
      component: "ExploreContainer",
      numberOfSubTab: 0,
      footerButtonText: "Siguiente",
      isCompleted: false,
      subTabLength: 3,
    },
    {
      title: "Descubrir",
      component: "ConcludeContainer",
      numberOfSubTab: 3,
      footerButtonText: "Siguiente",
      isCompleted: false,
      subTabLength: 3,
    },
    {
      title: "Concluir",
      component: "ViewFourContainer",
      numberOfSubTab: 2,
      footerButtonText: "Siguiente",
      isCompleted: false,
      subTabLength: 2,
    },
    {
      title: "Imaginar",
      component: "ViewFiveContainer",
      numberOfSubTab: 0,
      footerButtonText: "Enviar",
      isCompleted: false,
      subTabLength: 1,
    },
  ],
  buttonsLable: {
    reset: "Reiniciar",
    submit: "Enviar",
    start: "Iniciar",
    stop: "Parar",
    save: "Guardar",
    help: "Ayuda",
    labNotebook: "Cuaderno de laboratorio",
    skipToMain: "Saltar al contenido principal",
    play: "Activar sonido",
    pause: "Pausar sonido",
    replay: "Reactivar sonido",
    hamburger: "Más opciones",
    showMap: "Mostrar mapa",
  },
  commonWords: {
    selected: "seleccionado",
  },
};
