<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
class Home extends CI_Controller {

	public function __construct()
	{
		header('Access-Control-Allow-Origin: http://localhost:4200');
    	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    	header('Access-Control-Allow-Headers: Origin, content-type, X-Auth-Token,  Access-Control-Allow-Origin');
    	header('Content-Type: application/json');

		parent::__construct();
	}

	public function index()
	{
		
	}

	public function compileCode()
	{
		$program = $this->input->post('program');
		$language = $this->input->post('language');

		if($language == 1){
			$myFile = fopen('csharp/Program.cs', 'w+');
			if(fwrite($myFile, $program) == false){
				echo 0;
			}
			else{
				exec('docker rm csharpcompile');
				exec('docker run -it -d -v d:/Server/htdocs/Project/API/csharp:/data --name csharpcompile ubuntu:18.04');
				$result = exec('docker exec csharpcompile bash /data/compile.sh');
				echo json_encode($result);
			}
			
		}

		if($language == 2){
			$myFile = fopen('java/Main.java', 'w+');
			if(fwrite($myFile, $program) == false){
				echo 0;
			}
			else{
				exec('docker rm javacompile');
				exec('docker run -it -d -v d:/Server/htdocs/Project/API/java:/data --name javacompile ubuntu:18.04');
				$result = exec('docker exec javacompile bash /data/compile.sh');
				echo json_encode($result);
			}
		}


		if($language == 3){
			$myFile = fopen('python/Main.py', 'w+');
			if(fwrite($myFile, $program) == false){
				echo 0;
			}
			else{
				exec('docker rm pythoncompile');
				exec('docker run -it -d -v d:/Server/htdocs/Project/API/python:/data --name pythoncompile ubuntu:18.04');
				$result = exec('docker exec pythoncompile bash /data/compile.sh');
				echo json_encode($result);
			}
		}
	}

}

/* End of file Home.php */
/* Location: ./application/controllers/Home.php */	