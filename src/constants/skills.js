module.exports = {
  specializedSkills: [
    {
      name: "Front-end web development",
      icons: ["icon-react icon", "icon-html-five icon", "icon-sass-1 icon"],
      description: "I'm a developer who loves to create beautiful and functional websites using Javascript, HTML5, Sass/css and libraries such as React and D3."
    },
    {
      name: "Data-visualization",
      icons: ["icon-D3 icon"],
      description: "I have a passion for creating data visualizations with the help of D3. With it I am able to visualize both simple and complicated data in a fun and meaningful way."
    },
    {
      name: "Interaction design",
      icons: ["icon-heart icon"],
      description: "With a background in game design, my focus lies in creating an enjoyable user-experience. I believe that a good design is one that feels intuitive, one where the user is guided through his/her experience without being told what to do."
    },
  ],
  skills: {
    name: "Web development",
    type: "role",
    visibility: "hidden",
    children : [
      {
        name: "Front-end",
        type: "group",
        visibility: "hidden",
        children : [
          {
            name: "React",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "Javascript",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "CSS/Sass",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "HTML5",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "Responsive web development",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "Html2Canvas",
            type: "skill",
            visibility: "hidden"
          }
        ]
      },
      {
        name: "Data visualization",
        type: "group",
        visibility: "hidden",
        children : [
          {
            name: "D3js",
            type: "skill",
            visibility: "hidden"
          }
        ]
      },
      {
        name: "Design",
        type: "group",
        visibility: "hidden",
        children : [
          {
            name: "Game design",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "Illustration",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "Photoshop",
            type: "skill",
            visibility: "hidden"
          }
        ]
      },
      {
        name: "Tools",
        type: "group",
        visibility: "hidden",
        children : [
          {
            name: "SourceTree",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "Chrome dev tools",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "Git",
            type: "skill",
            visibility: "hidden"
          },
          {
            name: "NodeJs",
            type: "skill",
            visibility: "hidden"
          }
        ]
      },
      {
        name: "Methodologies",
        type: "group",
        visibility: "hidden",
        children: [
          {
            name: "SCRUM",
            type: "skill",
            visibility: "hidden"
          }
        ]
      }
    ]
  }
}
