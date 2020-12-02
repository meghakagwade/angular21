var myApp=angular.module("myApp",['ngRoute'])
                 .config(function($routeProvider){
                     $routeProvider
                     .when('/homePage', {
                        templateUrl: 'employeeLogin.html',
                        controller: 'emploginCtlr'
                    })
                    .when('/employeeList', {
                        templateUrl: 'employeeList.html',
                        controller: 'emplistCtlr'
                    })
                    .when('/employeeDetail', {
                        templateUrl: 'employeeDetail.html',
                        controller: 'empDetailCtlr'
                    })
                    .otherwise({ redirectTo: '/homePage' });
                 })

                 .service("getDataService",function($http){
                      this.newEmpId;
                      this.newEmp="";
                      this.editEmp="";
                      this.editEmpId="";
                      this.editEp=[];
                      this.employeeList=[];
                      this.index="";
                       this.getData=function(){
                        return $http.get("MOCK_DATA.JSON")
                       }

                 })
                 .controller("emplistCtlr",function($scope,getDataService,$location){
                     if(getDataService.employeeList.length==0){
                            getDataService.getData().then(function(response){
                            $scope.employees=response.data;
                            getDataService.employeeList=response.data;   
                    })
                    }else{
                         $scope.employees=getDataService.employeeList;
                    }
                      

                    $scope.age=function(birthdate){
                        var today=new Date();
                      
                        var birthdate=new Date(birthdate);
                       
                        age=today.getFullYear()-birthdate.getFullYear();
                        return age;
                        
                    }

                    $scope.addEmployee=function(){
                        getDataService.newEmp='ADD';
                        getDataService.newEmpId= $scope.employees[$scope.employees.length-1].empId+1;
                       console.log(getDataService.newEmpId);
                        
                        $location.path('/employeeDetail/');
                        
                    }
                    $scope.editEmployee=function(index){
                        getDataService.editEmp='Save';

                         getDataService.index=index;
                        $location.path('/employeeDetail/');
                        
                    }
                    $scope.delete=function(index){
                       getDataService.employeeList.splice(index,1); 
                    }

                    
                            
                })
                .controller("empDetailCtlr",function($scope,$location,getDataService){
                    
                    if(getDataService.newEmp=='ADD') 
                    {
                        
                        $scope.buttonName=getDataService.newEmp;
                        // console.log('In Detail ctrl : '+getDataService.newEmpId);
                        $scope.empid=getDataService.newEmpId;
                       
                    }  
                        
                    else if(getDataService.editEmp=='Save')
                          {
                            $scope.buttonName=getDataService.editEmp;
                            getDataService.editEmpId=getDataService.employeeList[getDataService.index];
                            //console.log(getDataService.editEmpId);
                            $scope.empid=getDataService.editEmpId.empId;
                            $scope.fname=getDataService.editEmpId.fname;
                            $scope.mname=getDataService.editEmpId.mname;
                            $scope.lname=getDataService.editEmpId.lname;
                            $scope.birthdate=new Date(getDataService.editEmpId.birthdate);


                             } 


                    $scope.cancel=function(){
                        $location.path('/employeeList/');
                    }  
                    
                    $scope.save=function(){


                    }

                    
                    $scope.addandUpdateEmp=function(){

                        today=new Date();
                        let bDate={
                            mm:$scope.birthdate.getMonth()+1,
                            dd:$scope.birthdate.getDate(),
                            yyyy:$scope.birthdate.getFullYear()
                        }
                        // if($scope.buttonName=='ADD')
                        // {
                            
                        if(getDataService.newEmp=='ADD')
                        {
                        getDataService.employeeList.push({
                            empId:getDataService.newEmpId,
                            fname:$scope.fname,
                            mname:$scope.mname,
                            lname:$scope.lname,
                            birthdate:bDate.mm+"/"+bDate.dd+"/"+bDate.yyyy,
                            // birthdate:new Date($scope.birthdate ),
                            age:(today.getFullYear()-($scope.birthdate).getFullYear())

                        });

                        console.log(getDataService.employeeList[getDataService.employeeList.length-1]);
                                $scope.empid="",
                                $scope.fname="";
                                $scope.mname="";
                                $scope.lname="";
                                $scope.birthdate="";
 
                       
                        // }
                    }
                       else if(getDataService.editEmp=='Save') {
                            var empupdate={
                                empId:$scope.empId,
                                fname:$scope.fname,
                                mname:$scope.mname,
                                lname:$scope.lname,
                                birthdate:bDate.mm+"/"+bDate.dd+"/"+bDate.yyyy,
                                // birthdate:new Date($scope.birthdate ),
                                age:(today.getFullYear()-($scope.birthdate).getFullYear())
    
                            }
                            alert(empupdate);
                            // alert(getDataService.index);
                            // // getDataService.employeeList[getDataService.index].push(empupdate);
                            // $scope.employees=getDataService.employeeList;
                        }
                    }

                })

                 .controller("emploginCtlr",function($scope,$location,$window){
                     $scope.login=function(){
                        $location.path('/employeeList/');
                     }
                     $scope.cancel=function(){
                           $window.close(); 
                     }
                })


                