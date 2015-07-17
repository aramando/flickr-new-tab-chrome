document.onreadystatechange = function() {
    var state = document.readyState;
    if(state === 'complete') {
      var currentTag = localStorage.getItem('flickrTag'),
          defaultTag = 'No tag selected !';
      if(currentTag && currentTag !== 'null') {
        document.getElementById('currentTag').innerText = currentTag;
      } else {
        document.getElementById('currentTag').innerText = defaultTag;
      }
      var submitButton = document.getElementById('submit'),
      inputTag = document.getElementById('tag'),
      clearButton = document.getElementById('clear'),
      deleteButton = document.getElementById('delete'),
      tagsArray, valuesArray, defaultTagCount = 6;
      var setTag = function(value) {
        var currentTag = localStorage.getItem('flickrTag');
        if(currentTag && currentTag !== 'null') {
          tagsArray = localStorage.getItem('flickrTag').split(',');
          valuesArray = value.split(',');
          console.log('Tags Array is ', tagsArray);
          console.log('Values Array is ', valuesArray);
          if(tagsArray.length + valuesArray.length < defaultTagCount + 1) {
            tagsArray = tagsArray.concat(valuesArray);
          } else {
            var length = Math.min(defaultTagCount, valuesArray.length);
            tagsArray.unshift(valuesArray);
            tagsArray.length = defaultTagCount;
            //for(var i = 0; i < length; i++) {
            //  tagsArray[i] = valuesArray[i];
            //}
          }
          localStorage.setItem('flickrTag', tagsArray.join(','));
        } else {
          localStorage.setItem('flickrTag', value);
        }
        //localStorage.setItem('flickrTag', value);
        document.getElementById('currentTag').innerText = localStorage.getItem('flickrTag');
        localStorage.setItem('flickrRecrawl', 'true');
        inputTag.value = '';
      }
      var deleteTags = function() {
        localStorage.removeItem('flickrTag');
        document.getElementById('currentTag').innerText = defaultTag;
        localStorage.setItem('flickrRecrawl', 'true');
      }
      submitButton.addEventListener('click', function() {
        if(inputTag.value) {
          setTag(inputTag.value);
        }
      });
      inputTag.addEventListener('keypress', function(event) {
        if(event.keyCode === 13 && inputTag.value) {
          setTag(inputTag.value);
        }
      });
      clearButton.addEventListener('click', deleteTags);
      deleteButton.addEventListener('click', deleteTags);
    }
}