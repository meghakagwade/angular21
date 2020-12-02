var myApp=angular.module("myApp",[])
    
        .controller("myCtlr", function($scope,$http,$filter){
            $http.get("MOCK_DATA.JSON")
            .then(function(respose){
                $scope.persons=respose.data;
            })

            $scope.clear=function(){
                $scope.input=null;
                // $('#inputBox').val("");

            }

            // $scope.showPerson= function(){
            //     alert($scope.input);
            //     $filter('filter')($scope.persons, {name: $scope.input});              
                
            // }
        

        // function searchanddisplay(input){
        //         for(i=0;i<$scope.persons.length;i++)
        //         {
        //            if($scope.persons[i].name.includes(input)){
        //                var newPerson=$scope.persons[i];
        //            }
        //         }
        //     }
 
        //     $scope.searchanddisplay=searchanddisplay;
           
           
});

