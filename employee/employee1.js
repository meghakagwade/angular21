var myApp = angular.module("myApp", ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/homePage', {
                templateUrl: 'employeeLogin.html',
                controller: 'loginCtlr'
            })
            .when('/employeeList', {
                templateUrl: 'employeeList.html',
                controller: 'empListCtrl'

            })
            .when('/employeeDetails/:id', {
                templateUrl: 'employeeDetail.html',
                controller: 'empDetailCtlr'

            })
            .otherwise({ redirectTo: '/homePage' });
    })
    .run(function ($http, getDataService) {
        $http.get("MOCK_DATA.JSON")
            .then(function (response) {
                getDataService.employees = response.data;
                getDataService.setDate();
            })

    })

    .service('getDataService', function ($http) {
        var employees;
        this.setDate = function () {
            this.employees.forEach((e => e.birthdate = new Date(e.birthdate)));
            // console.log(this.employees);
        }
        // this.getData = function () 
        //     $http.get("MOCK_DATA.JSON")
        //         .then(function (response) {
        //             this.employees = response.data;
        //         })
        //     return this.employees;
        // }

        this.getEmpData = function (id) {
            // alert(id);
            // var emp =  this.employees.filter(e => e.empId == id);
            for (let i = 0; i < this.employees.length; i++) {
                if (this.employees[i].empId == id) {
                    console.log(this.employees[i]);
                    return this.employees[i];
                }

            }

        }

    })

    .controller("loginCtlr", function ($scope, getDataService, $location, $window) {
        $scope.emplistPage = function () {
            $location.path('/employeeList/');
        }
        $scope.loginCancel = function () {
            $window.close();
        }



    })
    .controller("empListCtrl", function ($scope, getDataService, $location) {
        $scope.employees = getDataService.employees;

        console.log($scope.employees);
        $scope.calculateAge = function (birthdate) {
            // console.log(birthdate);
            var ageDifMs = Date.now() - new Date(birthdate);
            var ageDate = new Date(ageDifMs);
            $scope.age = Math.abs(ageDate.getUTCFullYear() - 1970);
            return $scope.age;
        }

        $scope.add = function () {
            $location.path('/employeeDetails/newEmp');


        }
        $scope.editEmp = function (empid) {
            $location.path('/employeeDetails/' + empid);

        }
        $scope.deleteEmp = function () {

        }
    })



    .controller("empDetailCtlr", function ($scope, getDataService, $routeParams) {
        // $scope.newemployees = getDataService.employees;
        if ($routeParams.id == "newEmp") {
            $scope.empid = ($scope.employees[$scope.employees.length - 1].empId) + 1;
            $scope.Save = 'Add';
        }
        else {
            $scope.Save = 'Update';
            $scope.employee = getDataService.getEmpData($routeParams.id);
        }
        $scope.addEmp = function () {
            if ($routeParams.id == "newEmp") {
                var newemployee = {
                    empId: $scope.employee.empId,
                    fname: $scope.employee.fname,
                    mname: $scope.employee.mname,
                    lname: $scope.employee.lname,
                    birthdate: $scope.employee.birthdate,
                }
            }
            else{
                
            }

            getDataService.employees.push(newemployee);

        }

    })
