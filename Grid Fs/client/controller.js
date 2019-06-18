app.controller("myctrl",function($scope,Upload, myfactory){
    $scope.msg = '';
    $scope.submit = function(fileObject) {
            console.log('File is ',fileObject);
          $scope.upload($scope.file);


          $scope.show = function(){
            let filename = $scope.file.name;
            console.log("file name ye h",filename);
        }  
        };
      
      

      $scope.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:5000/upload',  // Server Side URL to Upload
            data: {'file': file}
        }).then(function (resp) {
            // $scope.msg = resp['data']['msg'];
            console.log('Success ',resp.data.file);
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' );
        });
    };
    
})