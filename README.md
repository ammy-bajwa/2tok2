## 1tok1

#### LiveUrl:

https://wayn1tok1.herokuapp.com/


An Centralized exchange for crypto currency .All trades done in database only deposits and withdrawal done in blockChain 

## Installation and Setup Instructions

Clone down this repository . You will need `node` and `yarn` installed globally on your machine.  

Installation:

`yarn install`  

To Start Server:

`yarn run dev`  

To Visit App:

`localhost:3000`  

# Contribution

## Directory Layout
  - **pages folder**
  The Containers folder reflects the routes of the application. Each component inside this folder has its own route. A page component will contain children from components folder, parts folder, or its own subfolder. It has its own state, and usually call some services as well.
  - **pages/components folder**
  The components folder contains a collection of UI components like button, custom input field, modal, etc that will be shared and used across files in the project.(Note : only shared components should be in this folder)
  - **routes folder** is express route function to manage API integration and business login.
  - **public folder** includes assets to serve static for Ui use.
  - **models folder** includes database logics , etc.
  - **db folder** includes database connection and migrations.

## Code GuideLines:  

 - Every component should have unique id assign to root tag and every style css should be under that id 
 #### Example: 

file: components/sampleComponent/index.jsx


```
const sampleComponent = () => 
<div id="sample-component">
    <span className="title">Hello<span>
</div>
```


file: components/sampleComponent/index.scss

```
#sample-component{
    .title{
        color:'red'
    }
}
```

 
 - Splitting your bigger functions into multiple smaller functions will make the smaller functions more reusable. They will also become much easier to test. You can also create many utility files which can help you remove duplicate code from multiple files.
 - Create multiple files instead of writing a big file
 - Be very careful while naming your files  
 After looking at the name of the file, other developers should understand what the file is supposed to do. 
 For instance, dropdown.jsx is a good name but it’s very generic and if you use it in multiple places in the same directory, you might name it like topDropdown.jsx, bottomDropdown.jsx, which is bad. 
 A better way will be to prefix them with the job that they are supposed to perform. For instance, userDropdown.jsx, fileDropdown.jsx, etc.

### Naming

- Extensions: Use .jsx extension for React components.
- Filename: Use PascalCase for all component filenames. E.g., Card.jsx.
- Filename: Use camelCase for all non-component filenames. E.g., commonUtils.js.
- Component Naming: Use the filename as the component name. For example, ReservationCard.jsx should have a reference name of ReservationCard. However, for root components of a directory, use index.js as the filename and use the directory name as the component name:

```
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```
- Always use camelCase for prop names, or PascalCase if the prop value is a React component.
- Use index.jsx for each folder to export (Avoid repeating names on the imports)
## Git Guidelines:  
 - Create a new branch for every new feature/bug

 - Create Pull request to dev branch to submit your work
 
 - don't push unnecessary branches to remote Only PR branches should be pushed to remote 

