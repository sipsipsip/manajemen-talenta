<?php namespace App\Http\Controllers;

class ApiController extends Controller{

	public function getTalentScoreOfSection($section_id){
		$result;
		// kita pake dummy data
		$obj = new \StdClass();
		$obj->nama = "Taufik";
		$obj->ki = 10;
		$obj->ku = 9;
		$obj->nkp = 99;
		$obj->unit = "Unit";
		$obj->eselon = "Pelaksana";
		$obj->nama_jabatan = "Pelaksana";


		$result = [
			$obj
		];

		return $result;
	}
}