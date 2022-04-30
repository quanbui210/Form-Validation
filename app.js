//constructor function

function Validator(options) { 

    //function for validate action
    function validate(inputElement, rule) {
        const errorMessage = rule.test(inputElement.value);
        const errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                   
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid")
        } else {
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid")
                   }
    }

    //take element of form that needs to be validated
    var formElement = document.querySelector(options.form)
    
    if (formElement) {
        options.rules.forEach((rule) => {
            
            const inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                //solve blur case
                inputElement.onblur = () => {
                    validate(inputElement, rule)
             }
                //solve focus cases
                inputElement.oninput = () => {
                    const errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("invalid")
                }

            }
        })
 }
}

//Define rules for validators
Validator.isRequired = (selector, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() ? undefined : message || "This field is required"
        }
    }
}

Validator.isEmail = (selector, message) => {
      return {
        selector: selector,
        test: (value) => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message|| "Invalid"
        }
    }
}

Validator.minLength = (selector, min, message) => {
    return {
      selector: selector,
      test: (value) => {
        return value.length >= min ? undefined : `Password must have at least ${min} characters`
      }
  }
}

Validator.isConfirmed = (selector, getConfirmValue, message) => {
    return { 
        selector: selector,
        test: (value) => {
            return value === getConfirmValue() ? undefined : message || "Invalid"
        }
    }
}