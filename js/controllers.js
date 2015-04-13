var myApp = angular.module('myApp', []);

myApp.controller('MyController', function MyController($scope, $http, $filter) {

	var getExpertises = function(data) {
			var expertises = [];
			$(data).each(function(index, item) {
				if($.inArray(item.expertise, expertises) === -1) expertises.push(item.expertise);
			});

			return expertises;
	};

	
	$http.get('js/data.json').success(function(data) {
		$scope.staff 	   		=  data;
		$scope.expertises  		= getExpertises(data);
		$scope.deletedPersons 	= [];
        $scope.selection        = $scope.expertises;

		$scope.toggleSelection = function toggleSelection($event, expertise) {
			var selectedCheckBox = $event.target;

			if ($(selectedCheckBox).is(':checked')) {
                angular.forEach($scope.deletedPersons, function(item, index) {
                    $scope.staff.push(item);
                    $scope.deletedPersons.splice(index, 1);
                });
			} else {
                var deletedPersons = $filter('filter')($scope.staff , { expertise: expertise });

                $(deletedPersons).each(function(index, item){
                    var indexToDelete = $.inArray(item, $scope.staff);

                    if (indexToDelete > -1) {
                        $scope.deletedPersons.push($scope.staff[indexToDelete]);
                        $scope.staff.splice(indexToDelete, 1);

                    }
                });
			}
		};

	});

	
	
});