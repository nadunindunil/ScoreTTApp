
tt.controller('ScoreCtrl', function($scope,$ionicPopup,$cordovaSQLite){

  
  $scope.name = "Nadun";
  $scope.set1player1 = 0;
  $scope.set1player2 = 0;
  $scope.set2player1 = 0;
  $scope.set2player2 = 0;
  $scope.set3player1 = 0;
  $scope.set3player2 = 0;
  $scope.set4player1 = 0;
  $scope.set4player2 = 0;
  $scope.set5player1 = 0;
  $scope.set5player2 = 0;
  $scope.set = 1;
  
  $scope.score1 = 0;
  $scope.score2 = 0;
  $scope.player1 = "player1";    
  $scope.player2 = "player2";
  // $scope.set1player1 = $scope.score1;
  // $scope.set1player2 = $scope.score2;

  $scope.store = function(p1name,p2name,p1set1,p1set2,p1set3,p1set4,p1set5,p2set1,p2set2,p2set3,p2set4,p2set5){
    var query1 = "INSERT INTO match (player1, player2) VALUES (?,?)";
    var query2 = "INSERT INTO player1 (p1name,p1set1,p1set2,p1set3,p1set4,p1set5) VALUES (?,?,?,?,?,?)";
    var query3 = "INSERT INTO player2 (p2name,p2set1,p2set2,p2set3,p2set4,p2set5) VALUES (?,?,?,?,?,?)";

    $cordovaSQLite.execute(db,query2,[p1name,p1set1,p1set2,p1set3,p1set4,p1set5]).then(function(result){
      console.log("INSERT ID->"  + p1name);
    },function(error){
      console.log(error);
    
    });

    $cordovaSQLite.execute(db,query3,[p2name,p2set1,p2set2,p2set3,p2set4,p2set5]).then(function(result){
      console.log("INSERT ID->"  + p2name);
    },function(error){
      console.log(error);
    
    });

    $cordovaSQLite.execute(db,query1,[p1name,p2name]).then(function(result){
      console.log("INSERT3 ID->" + p1name + " " + p2name);
    },function(error){
      console.log(error);
    
    });

  };

  $scope.changeSet = function(val){
    $scope.set = val;
    
  }

  $scope.onSwipeUp1 = function(score){
    score += 1;
    console.log($scope.set);
    if ($scope.set == 1){
      $scope.set1player1 = score; 
    }
    else if ($scope.set == 2){
      $scope.set2player1 = score;
    }
    else if ($scope.set == 3){
      $scope.set3player1 = score;
    }
    else if ($scope.set == 4){
      $scope.set4player1 = score;
    }
    else if ($scope.set == 5){
      $scope.set5player1 = score;
    }
    return score;
  };

  $scope.onSwipeDown1 = function(score){
    if (score>0){ score -= 1; }
    if ($scope.set == 1){
      
    $scope.set1player1 = score;
    
    }
    else if ($scope.set == 2){
      $scope.set2player1 = score;
    }
    else if ($scope.set == 3){
      $scope.set3player1 = score;
    }
    else if ($scope.set == 4){
      $scope.set4player1 = score;
    }
    else if ($scope.set == 5){
      $scope.set5player1 = score;
    }

    return score;
  };

  $scope.onSwipeUp2 = function(score){
    score += 1;

    if ($scope.set == 1){
      
    $scope.set1player2 = score;
    
    }
    else if ($scope.set == 2){
      $scope.set2player2 = score;
    }
    else if ($scope.set == 3){
      $scope.set3player2 = score;
    }
    else if ($scope.set == 4){
      $scope.set4player2 = score;
    }
    else if ($scope.set == 5){
      $scope.set5player2 = score;
    }
    return score;
  };

  $scope.onSwipeDown2 = function(score){
    if (score>0){ score -= 1; }
    if ($scope.set == 1){
      
      $scope.set1player2 = score;
    
    }
    else if ($scope.set == 2){
      $scope.set2player2 = score;
    }
    else if ($scope.set == 3){
      $scope.set3player2 = score;
    }
    else if ($scope.set == 4){
      $scope.set4player2 = score;
    }
    else if ($scope.set == 5){
      $scope.set5player2 = score;
    }
    return score;
  };

  $scope.onTouch = function() {

    var person = prompt("Please enter Player Name", "Player");
    
    if (person != null) {
        return person;
    }
    else{
      return "null";
    }
  };

  $scope.addScores = function(){
    
    //$scope.set1player1 = $scope.score1;
    //$scope.$apply();

  };

  //new methods to control the score board
  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
      title: 'Edit Colomn',
      template: 'Values will be edited.',
   });
   confirmPopup.then(function(res) {
      if (res) {
         console.log('You clicked on "OK" button');
      } else {
         console.log('You clicked on "Cancel" button');
      }
   });
  };

  $scope.showPrompt = function() {
   var promptPopup = $ionicPopup.prompt({
      title: 'Change Name',
      template: 'Enter the Name of Player'
   });
   promptPopup.then(function(res) {
      if (res) {
         console.log('Your input is ', res);
      } else {
         console.log('Please enter input');
      }
   });
};
  

  

});

tt.controller('StoreCtrl', function($scope, $stateParams,$cordovaSQLite) {


  $scope.show = function(pname){
    var query = "SELECT p1.p1name,p2.p2name FROM match AS M LEFT JOIN player1 AS p1 ON M.player1 = p1.pid LEFT JOIN player2 AS p2 ON M.player2 = p2.pid";
    $cordovaSQLite.execute(db,query).then(function(result){

      if (result.rows.length > 0 ){
        console.log("selected -> " + result.rows.item(0).p1name + " " + result.rows.item(0));

      }
      else{
        console.log("NO rows!");
      }

    },function(error){
      console.log(error);
    });


  };

});

tt.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});



