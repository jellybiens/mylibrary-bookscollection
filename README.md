# mylibrary-bookscollection
 
## React vs Angular
The benefits of using React over Angular are based around how React is a core library and not framework, this more lightweight option gives me the choice about about other dependencies I wish to use, for example routers. Angular has a predefined router in the framework, so if I desired to use another, this router would just be redundant space being taken up.
React’s use of the virtual dom structure makes it much more faster than Angular with its regular dom. React will update only that which needs updating based on the difference between the VDOM and the DOM, whereas Angular would update the whole component tree as it cannot be sure what and where has changed on the DOM.
React also uses one way dataflow, while not an issue for this app, with larger apps will keep the data easier to maintain, improving the efficiency of debugging. Angular uses two way databinding which can cause debugging hell on large projects.
	
## Bootstrap vs Semantic-UI
Bootstrap offers a predefined layout grid system which enables for consistent designs across different browsers and devices, with responsive design for accommodating for all different screen sizes. It is simple to get up and running for basic components whereas in some cases with Semantic-UI it requires more set up with both css and javascript for components.
	
## Gulp vs Grunt (vs Webpack)
The main difference between Gulp and Grunt is code vs configuration for tasks respectively. Using code for gulp can give much shorter and concise task definition than the json configuration in grunt tasks. Taking single purpose plugins, Gulp allows for more customisation of what tasks are doing at run time, whereas Grunt is limited to the configuration options. 
Gulp is able to handle several tasks all at the same time but Grunt can only deal with one, giving Gulp the edge on speed performance.

However I went with webpack due to, with such a small project only desiring bundling and compiling the app, webpack allows for everything including non js components to be combined into one core js file, whereas Gulp/Grunt are more focused towards defined paths for the file structure of the project in development for js, images, css, etc, and with a React app importing all sorts of files within the JSX structure, webpack suits this form of project much more (that and my laptop is on it’s deathbed and could only handle webpack over Gulp)
Webpack is far easier set up and the convenience for development with the webpack-dev-server module, auto-updating when changes are made based on the webpack.config, instead of having to set up task runners and watchers in Gulp for following such changes and restarting a dev server programmatically.

## Sass vs Less vs Stylus
Each styling option is more or less the same in terms of features and functionality. Sass offers the most programmatic features which gives it an edge for more complicated implementation features. Though for such a small project all three are more or less the same, adding in the use of Bootstrap and its pre-defined styling, the use of SASS was just a personal preference based on past experience.

## Babel vs Coffeescript vs ES5
Firstly, why didn’t I use ES5? This was because the features of ES6+ allowing for more concise javascript code and more functional features to be used when building the app, features like arrow functions, object destructuring, promises etc. Whereas writing pure ES5 to achieve these features would be somewhat tedious.
As for babel over Coffeescript, babel allows to just write standard ES6+ code and then compile it into readable ES5 code for cross browser support. Coffeescript on the other hand brings in a whole other factor of writing more verbose code, similar to more standard object orientated programming. Of which, while it can give for easier debugging while coding, avoiding abstract equality for example, the positives provided by coffeescript can be achieved simply with a mix of strict equality for the given example, PropTypes in React, ES6+ features and linter options.
Coffeescript just bring in a whole other layer of complexity to the code of an app which itself can be quite simple.

## NPM vs Bower
One of the main features of bower was that it had a flat dependency tree which would allow it to be a great deal lighter than npm. However as of npm3, npm also supports flat dependency trees but also allows for the dependencies of dependencies to rely on multiple different versions of the same dependency if desired. However, this flat structure isn’t necessarily a bonus, as it puts the onus of keeping all dependency management on the developer. Npm on the other hand deals with all of this for the developer.
