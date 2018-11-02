# React Redux Watcher ![Example module created automatically](https://s3-eu-west-1.amazonaws.com/moaiii-cv/react-icon.png) 

##### Watch for changes in react components and add to the redux store automatically
___

### Purpose
This tool can run in your start script where it will look for the creation or deletion of redux files and automatically import them to your store.

The aim is reducer the amount of configuration time needed in development, to get up and runnning quickly and remove architectural consideration when in a creative development flow. 

### Considerations
Currently the tool by default looks for changes in .middleware.js and .reducer files in ```./src```

### Useage
Install 
```$npm i -g ....```

Once installed globally you have access to the CLI command `$react-watch`. 

An example command would be
```$react-watch --src=./src/wherever```

A watcher will begin and once you create or delete a middleware or reducer file the tool will update the imports in your store automatically. 

### Output
<!-- ```$rcr --view --ExampleComp --stateful --redux```

Creates the following files in `./src/ui/views`

![Example module created automatically](https://s3-eu-west-1.amazonaws.com/moaiii-cv/Screenshot+2018-11-02+at+12.53.05.png)

```$rcr --forms --AnotherExample --stateless```

Creates the following files in `./src/ui/views`

![Example module created automatically](https://s3-eu-west-1.amazonaws.com/moaiii-cv/Screenshot+2018-11-02+at+12.57.34.png) -->