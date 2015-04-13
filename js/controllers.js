var myApp = angular.module('myApp', []);

myApp.controller('MyController', function MyController($scope, $http, $filter) {
    $scope.deletedPersons 	= [];
    $scope.staff 	        = [];
    $scope.expertises       = [];
    $scope.amountStaff      = 0;

    var updateAmountStaff = function() {
        return $scope.staff.length;

    };

	var getExpertises = function(data) {
        var expertises  = [];
        var toReturn    = [];
        var id          = 0;
        $(data).each(function(index, item) {
            if($.inArray(item.expertise, expertises) === -1) expertises.push(item.expertise);
        });

        $(expertises).each(function(index, item) {
            var obj = {};
                obj.name = item;
                obj.id   =  id;

            toReturn.push(obj);
            id++;
        });

        return toReturn;
	};

    $scope.updateSelection = function($event) {
        var data            = {},
            personsToDelete = [];
            data.element    = $event.target;
            data.id         = $(data.element).attr('id');
            data.name       = $(data.element).data('name');

          if ($scope.selection.ids[data.id] === true) {

              angular.forEach($scope.deletedPersons, function(itemDeleted, indexDeleted) {
                  if (itemDeleted.expertise === data.name) {
                      $scope.staff.push(itemDeleted);
                      $scope.deletedPersons.splice(indexDeleted, 1);
                  }
              });

          } else {
              personsToDelete = $filter('filter')($scope.staff , { expertise: data.name });
              angular.forEach(personsToDelete, function(itemDeleted) {
                  angular.forEach($scope.staff, function(itemStaff, indexStaff) {
                        if (itemDeleted === itemStaff) {
                            $scope.staff.splice(indexStaff, 1);
                            $scope.deletedPersons.push(itemStaff);
                        }
                  })
              });
          }

        $scope.amountStaff  = updateAmountStaff();


     };

	
	$http.get('js/data.json').success(function(data) {
		$scope.staff 	   		=  data;
		$scope.expertises  		= getExpertises(data);
        $scope.selection        = $scope.expertises;

        $scope.amountStaff  = updateAmountStaff();

        $scope.selection = {
            ids: {
                "0": true,
                "1": true,
                "2": true,
                "3": true,
                "4": true,
                "5": true,
                "6": true,
                "7": true,
                "8": true,
                "9": true,
                "10": true,
                "11": true,
                "12": true,
                "13": true,
                "14": true,
                "15": true,
                "16": true,
                "17": true,
                "18": true,
                "19": true,
                "20": true,
                "21": true,
                "22": true,
                "23": true,
                "24": true,
                "25": true,
                "26": true,
                "27": true,
                "28": true,
                "29": true,
                "30": true,
                "31": true,
                "32": true,
                "33": true,
                "34": true,
                "35": true,
                "36": true,
                "37": true,
                "38": true,
                "39": true,
                "40": true,
                "41": true,
                "42": true,
                "43": true,
                "44": true,
                "45": true
            }
        }




	});

	
	
});