<p>
  <img align="left" src="/uofr_logo.png" alt="U of R logo" width="20%"/>
  <img align="right" src="/pencil_logo.PNG" alt="Pencil logo" width="15%"/>
</p>

<br/><br/><br/><br/>

# Pencil

Software Systems Engineering Capstone Project - University of Regina - 2019-2020
<br/>

**Contributors:** Paul Hewitt, Ian Quach

**Documentation & Deliverables:**
* [Project Video](https://youtu.be/8dgjCD_Ma-w)
* [Project Presentation](https://github.com/paulhewitt/Capstone/blob/master/Presentations/Pencil%20Presentation.pdf)
* [Design Document](https://github.com/paulhewitt/Capstone/blob/master/Documentation/Pencil%20Design%20Document.pdf)
* [Code Quality Report](https://github.com/paulhewitt/Capstone/blob/master/Documentation/Code%20Quality%20Review%20Report.pdf)
* [Project Experience Report](https://github.com/paulhewitt/Capstone/blob/master/Documentation/Project%20Experience%20Report.pdf)
* [Pencil User Manual](https://github.com/paulhewitt/Capstone/blob/master/Documentation/Pencil%20User%20Manual.pdf)
* [Poster](https://github.com/paulhewitt/Capstone/blob/master/Documentation/Pencil%20Poster.pdf)
* [Frontend Code](https://github.com/paulhewitt/Capstone/tree/master/pencil)
* [Backend Code](https://github.com/paulhewitt/Capstone/tree/master/back/pencilService)
* [Miscellaneous Documents](https://github.com/paulhewitt/Capstone/tree/master/Documentation/Miscellaneous%20Documentation)
* [Miscellaneous Presentations](https://github.com/paulhewitt/Capstone/tree/master/Presentations/Miscellaneous%20Presentations)
      
## Project Information
**Project Description**

Pencil is a software as a service application (SaaS), that simplifies the once complicated task of customer scheduling. By allowing business owners to easily create their own online schedule, potential customers can see available time slots, and book desired appointments. Users are able to find other businesses that are also using Pencil, making it a one of a kind, online business aggregator. Lastly, Pencil provides booking data analytics, and visualization to business owners. This gives owners valuable business intelligence, and allows them to see what is, and what isn’t working.

**Project Implementation**

Using an Angular frontend, and an AWS backend, we are utilizing an industry standard cloud platform, combined with one of the world’s most popular frontend frameworks. The backend itself is programmed using Go. We decided to use a modern, powerful tech stack for a couple of different reasons. Both AWS and Angular are extremely powerful, allowing you to build small test applications, up to industry ready, scalable software capable of handling millions of daily active users. We also wanted to consider security. AWS is one of the most secure platforms in the world, and we wanted to trust Pencil’s backend with one of the world’s leading cloud platforms.

## Installation Instructions

### Prerequisites
#### Installing Node

Before you begin, your development environment must include Node.js and an npm package manager. By installing Node, the npm client will be installed by default. The download for Node can be found [here](https://nodejs.org/en/).

#### Installing Angular

To install globally
```bash
npm install -g @angular/cli
```

To install locally
```bash
npm install @angular/cli
```

### Running Pencil

Acquire a copy of this repository, and navigate to the frontend code `Capstone/pencil`. Run the npm install command found below to download all required dependencies
```bash
npm install
```

Finally, run ng serve to run the appication's front end.
```bash
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your web browser. Pencil will now be running

Due to the sensitive nature of publically exposing API Keys, our keys are stored in an environment file which has been withheld from this repository. Google Maps, and our API will not function without these keys. Please send [Paul](mailto:paul@hewitt.dev?subject=PencilAPI) or [Ian](mailto:quach.ian07@gmail.com?subject=PencilAPI) an email and we will distribute your key.  
