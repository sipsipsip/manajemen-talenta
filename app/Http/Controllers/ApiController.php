<?php namespace App\Http\Controllers;

use App\Models\TalentScore;

class ApiController extends Controller{

	public function getTalentScoreOfSection($section_id){
		$result;
		
		$result = TalentScore::where('section_id', $section_id);

		return $result->get();
	}
}