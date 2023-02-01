 export const replaceValue = (obj:any, label = 'x-component') => {
    const xComponentArray = ['input', 'select', 'timePicker', 'treeselect', 'cascader', 'datepicker', 'daterangepicker', 'numberpicker'];
    for(const key in obj)
    {
      if (typeof obj[key] === 'string')
      {
          const xComponentVal = obj[key].split(".");
         
          const xComponentValPrime = xComponentVal[0].toLowerCase();
          // removing the arrayitems soratble, remove and addition in the preview
          if (key === label && xComponentValPrime.includes("arrayitems") && xComponentVal.length > 1)
          { 
            obj[key] = "";
          }

          // adding suffix to the x-component value
          if(key === label && xComponentArray.includes(xComponentValPrime))
          {
            obj[key] = `PreviewText.${xComponentVal[0]}`;
            break;
          }
        }
      if (typeof obj[key] === 'object' && obj[key] !== null) 
      {
        replaceValue(obj[key], label);
      }
    }
    
      return obj;
  }
   export  const addPreview = (schema: any) => {
      const {properties} = schema.properties.step;
      const previewObj = `step${properties.length + 1}`;
      properties[previewObj] = {
        type: 'void',
        'x-component': 'FormStep.StepPane',
        properties: {},
      }
      for(const step in properties)
      {
        const stepElements = properties[step].properties;
        for(const element in stepElements)
        {
          const previewElement = JSON.parse(JSON.stringify(stepElements[element]));

          // uncomment the following line to see preview UI and comment the next line.
          //properties[previewObj].properties[element] = replaceValue(previewElement, 'x-component');

          properties[previewObj].properties[element] = disableFields(previewElement);

        }
      }
    }

    //Finds the object with 'type' as 'string' and adding disabled:true value in the x-component-props object.

    const disableFields = (obj:any) => {
      const propLabel =  'x-component-props';
      const disableObj = {disabled:true};
      const arrayComp = 'ArrayItems';

      for(const key in obj)
      {
          // replacing x-component with none for the arrayitems soratble, remove and addition in the preview
          if(key === 'x-component' && obj[key].includes(arrayComp) && obj[key].split(".").length > 1)
          {
            obj[key] = "";
          }
          if( (key === 'type' && obj[key] === 'string') || obj[key].type === 'string')
          {
            const stringObj = (key === 'type' ? obj : obj[key]);
            stringObj[propLabel] = stringObj.hasOwnProperty(propLabel) ? Object.assign(stringObj[propLabel],disableObj) : disableObj;
          }
          else if (typeof obj[key] === 'object' && obj[key] !== null) 
          {
            disableFields(obj[key]);
          }
      }
        return obj;
    }
