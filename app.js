const app = angular.module('MyApp', []);



app.controller('appController', ['$http', function($http){
  const controller = this;
  this.includePath = 'partials/events.html';


  // create user
  this.indexOfUserFormToShow = null;
  this.createUser = function(){
    $http({
      method: 'POST',
      url: '/users',
      data: {
        username: this.username,
        password: this.password
      }
    }).then( response => {
      console.log(response);
      this.indexOfUserFormToShow = null;
    }).catch( err => {
      console.log(err);
    })
  }

  //login user
  this.indexOfLogFormToShow = null;
  this.logIn = function(){
    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.logUsername,
        password: this.logPassword
      }
    }).then( response => {
      console.log(response);
      this.indexOfLogFormToShow = null;
      this.goApp();
    }).catch( err => {
      console.log(err);
    })
  }
  // log out user
  this.logOut = function(){
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then( response => {
      this.loggedInUsername = null;
      this.loggedInUserId = null;
      this.getEvent();
    }).catch( err => {
      console.log(err);
    })
  }
  //go to user session
  this.goApp = function(){
    $http({
      method: 'GET',
      url:'/app'
    }).then( response => {
      console.log(response);
      controller.loggedInUsername = response.data.username
      controller.loggedInUserId = response.data._id
    }).catch( err => {
      console.log(err);
    })
  }
  //create event
  this.createEvent = function(){
    $http({
      method:'POST',
      url: '/events',
      data: {
        name: this.name,
        email: this.email,
        image: this.image,
        zip: this.zip,
        description: this.description
        }
    }).then(function(response){
        controller.getEvent() //refresh the list
        console.log(response);
    }, function(){
        console.log('error');
    });
  }

  //Function to grab events from the database and show them on the page
  this.indexOfPhotoToShow = null;
  this.getEvent = function(){
    $http({
      method:'GET',
      url: '/events',
    }).then(function(response){
        controller.events = response.data;
        console.log(response);
    }, function(){
        console.log('error');
    });
  };

  // Function to delete an event
  this.deleteEvent = function(event){
  $http({
    method:'DELETE',
    url: '/events/' + events._id
  }).then(
    function(response){
      controller.getEvent(); //refresh event list
    },
    function(error){
    }
    );
  }

  //function to update an event
  this.editEvent = function(event){
    $http({
      method:'PUT',
      url: '/events/' + item._id,
        data: {
          name: this.updatedName,
          email: this.updatedEmail,
          image: this.image,
          price: this.updatedPrice,
          zip: this.updatedZip,
          description: this.updatedDescription
          }
      }).then(
          function(response){
            controller.getEvent();
            controller.indexOfEditFormToShow = null;
          },
          function(error){

          }
      );
  }

//send email
  this.indexOfEmailFormToShow = null;
  this.sendEmail = function(sendName, sendMail, sendMessage, sendTo){
    $http({
      method:'POST',
      url: '/send',
        data: {
          name: this.sendName,
          email: this.sendMail,
          message: this.sendMessage,
          sendTo: this.sendTo
          }
      }).then(
          function(response){
            controller.getEvent();
            this.indexOfEmailFormToShow = null;
          },
          function(error){

          }
      );
  }

//function to search searchbar//

  this.searchForEvent = function(){
    $http({
      method:'GET',
      url: '/events/',
      data: {
        name: this.name,
        email: this.email,
        price: this.price,
        zip: this.zip,
        description: this.description
      }
      }).then(function(response){
          console.log(response);
      }, function(){
          console.log('error');
      });
  }

//function to toggle item when clicked
this.toggleEventComplete = function(event){
    let newValue;
    if(events.complete === true){
        newValue = false;
    } else {
        newValue = true;
    }

    $http({
        method:'PUT',
        url: '/events/' + events._id,
        data: {
          name: this.name,
          email: this.string,
          phone: this.phone,
          zip: this.zip,
          price: this.price,
          description: this.description
        }
    }).then(function(response){
        controller.getEvent();
    }, function(){
        console.log('error');
    });
}

this.getEvent();

//show item
this.targetIndexId = '';

this.showEvent = (event) => {
  //get events id and put into targetIndexId
  this.targetIndexId = events;
};

}]);
