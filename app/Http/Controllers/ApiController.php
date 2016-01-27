<?php namespace App\Http\Controllers;

use App\Models\TalentScore;
use App\Models\Pegawai;
use App\Models\TalentGroup;
use App\Models\TalentSection;
use App\Models\Datadiri;

class ApiController extends Controller{

	public function getTalentScoreOfSection($section_id){
		$result;
		
		$result = TalentScore::where('section_id', $section_id);

		return $result->get();
	}


	public function getData(){
        $result;

         // Get the query params
        $page = \Input::get('page') ? \Input::get('page') : 1;
        $per_page = \Input::get('per_page') ? \Input::get('per_page') : 10;
        $sort_by = \Input::get('sort_by') == NULL ? NULL : \Input::get('sort_by');
        $q = \Input::get('q');
        $q_identifier = \Input::get('q_identifier');
        $modelClass = \Input::get('model');
        $modelClass = ucfirst($modelClass);
        $modelClass = 'App\\Models\\'.$modelClass;


        $result = $modelClass::take(10)->get();

        if($q){
            $result = $modelClass::where($q_identifier, 'like', '%'.$q.'%');
            $result = $result->get();
        }

        return $result;
	}



	public function getDataPegawai($user_nip){

	    $result;
	    $result = Pegawai::where('nip', $user_nip)->first();

	    return $result;
	}


	public function postTalent(){
	    $properties = \Input::all();

	    \Eloquent::unguard();
	    $new_talent = new TalentScore($properties);
	    $new_talent->save();

	    return $new_talent;
	}

	public function updateTalent($nip){
        $properties = \Input::all();

        $talent = TalentScore::where('nip', $nip)->where('section_id', $properties['section_id'])->first();
        \Eloquent::unguard();
        $talent->update($properties);
        $talent->save();

        return $talent;
    }

	public function deleteTalent($nip){
        TalentScore::where('nip', $nip)->where('section_id', \Input::get('section_id'))->delete();
        return "ok";
	}

	public function getGroupList(){
	    $result;
	    $result = TalentGroup::orderBy('created_at','DESC')->where('archived', 0)->get();
	    return $result;
	}

    public function getArchivedGroupList(){
        $result;
        $result = TalentGroup::orderBy('created_at','DESC')->where('archived', 1)->get();
        return $result;
    }



	public function createGroup(){

	    $properties;
	    $talent_group;

        $properties = \Input::all();

        \Eloquent::unguard();
        $talent_group = TalentGroup::create($properties);

        // create default section
        $this->_createDefaultSection($talent_group->id);
	}

	function _createDefaultSection($group_id){
        $this->_createSection('Eselon II', $group_id);
        $this->_createSection('Eselon III', $group_id);
        $this->_createSection('Eselon IV', $group_id);
        $this->_createSection('Auditor Utama', $group_id);
        $this->_createSection('Auditor Madya', $group_id);
        $this->_createSection('Auditor Muda', $group_id);
        $this->_createSection('Auditor Penyelia', $group_id);
        $this->_createSection('Auditor Pertama', $group_id);
        $this->_createSection('Auditor Pelaksana Lanjutan', $group_id);
        $this->_createSection('Auditor Pelaksana', $group_id);
        $this->_createSection('Pelaksana', $group_id);

	}

	function _createSection($title, $group_id){
	    $newSection = TalentSection::create(['title'=>$title, 'group_id'=>$group_id]);
	    $this->_populateUsers($newSection);
	}

    function _populateUsers($section){
        $datadiri = [];
        switch($section->title){
            case "Eselon II":
                $datadiri = Datadiri::where('eselon', 2)->get();
                break;
            case "Eselon III":
                $datadiri = Datadiri::where('eselon', 3)->get();
                break;
            case "Eselon IV":
                $datadiri = Datadiri::where('eselon', 4)->get();
                break;
            case "Auditor Utama":
                $datadiri = Datadiri::where('eselon', 'FA1')->get();
                break;
            case "Auditor Madya":
                $datadiri = Datadiri::where('eselon', 'FA2')->get();
                break;
            case "Auditor Muda":
                $datadiri = Datadiri::where('eselon', 'FA3')->get();
                break;
            case "Auditor Penyelia":
                $datadiri = Datadiri::where('eselon', 'FT1')->get();
                break;
            case "Auditor Pertama":
                $datadiri = Datadiri::where('eselon', 'FA4')->get();
                break;
            case "Auditor Pelaksana Lanjutan":
                $datadiri = Datadiri::where('eselon', 'FT2')->get();
                break;
            case "Auditor Pelaksana":
                $datadiri = Datadiri::where('eselon', 'FT3')->get();
                break;
            case "Pelaksana":
                $datadiri = Datadiri::where('eselon', 'Non')->orWhere('eselon', 'KA3')->orWhere('eselon', 'KA4')->orWhere('eselon', 'KT2')->orWhere('eselon', 'KT3')->get();
                break;
            default:
                // ga usah ngapa2 in di sini

        }

        // assign pegawai ke section
        \Eloquent::unguard();
        foreach($datadiri as $p){
            $talent = TalentScore::create(
                [
                    'section_id' => $section->id,
                    'nip'=>$p->nip,
                    'usia'=>$p->usia,
                    'eselon'=>$p->eselon,
                    'nama'=> $p->nama,
                    'unit'=> $p->unit_eselon_2
                ]
            );
        }



    }

	public function getSectionList($group_id){
	    $result;
	    $result = TalentSection::where('group_id', $group_id)->get();

	    return $result;
	}


	public function deleteGroup($group_id){
	    $group;
        $sections;

	    // delete sections first and all related talent score
        $sections = TalentSection::where('group_id', $group_id)->get();

        // delete talents scores that belongs to section
        foreach($sections as $section){
            TalentScore::where('section_id', $section->id)->delete();
        }

        // delete sections that belongs to group
        TalentSection::where('group_id', $group_id)->delete();


        // finally delete the group itself
	    $group = TalentGroup::where('id', $group_id)->delete();

	    return "ok";

	}

	public function toggleArchiveGroup($group_id){
	    $group;
	    $group = TalentGroup::findOrFail($group_id);
	    $group->archived = ($group->archived == 0) ? 1 : 0;
	    $group->save();
	    return "archived";

	}

	public function duplicateGroup($group_id){
	    $group;
	    $sections;
	    $scores;

	    $group_title = \Input::get('group_title');

	    \Eloquent::unguard();

	    // first duplicate the group
	    $group = TalentGroup::where('id', $group_id)->first();
	    $newGroup = $group->replicate();
        $newGroup->title = $newGroup->title . " COPY";

        $group_properties = ['title'=>$group_title];


	    $newGroup = TalentGroup::create($group_properties);

	    // then duplicate sections
	    $sections = TalentSection::where('group_id', $group_id)->get();

	    foreach($sections as $section){
	        // duplicate section
            $newSection = TalentSection::create(['title'=>$section->title, 'group_id'=>$newGroup->id ]);

            // Duplicate talent score
	        $scores = TalentScore::where('section_id', $section->id)->get();
	        foreach($scores as $talent){
	            $newTalent = $talent->replicate();
                $newTalent->section_id = $newSection->id;
	            $newTalent->push();

	        }


	    }
	return "ok";

	}


	public function getSummary($group_id){
	    $talent_group = TalentGroup::findOrFail($group_id);
	    $talent_sections = TalentSection::where('group_id', $talent_group->id)->get();
	    $talent_scores = [];
	    $total_pegawai = 0;

	    foreach($talent_sections as $section){
	        $scores = TalentScore::where('section_id', $section->id)->get();
	        $section['scores'] = $scores;
	        $section['total_pegawai'] = count($scores);
	        $total_pegawai += count($scores);
	    }

        $result = [];
        $result['group'] = $talent_group;
        $result['sections'] = $talent_sections;
        $result['section_classified'] = TalentSection::where('group_id', $talent_group->id)->groupBy('title')->get();
        return $result;
	}

	public function reportForClass($classID){
	    $result;
	    $scores;
	    $section;


	    $section = TalentSection::where('id', $classID)->first();
	    $group = TalentGroup::where('id', $section->group_id)->first();
	    $scores = TalentScore::where('section_id', $classID)->get();

	    $result['label'] = $section->title;
	    $result['scores'] = $scores;
	    $result['kelas'] = $section;
	    $result['group'] = $group;

	    return $result;
	}

	public function reportForGroup($id){
        $result;
        $group;
        $sections;
        $scores;

        $group = TalentGroup::findOrFail($id);
        $sections = TalentSection::where('group_id', $group->id)->get();
        $scores = [];

        foreach($sections as $section){
            $s = TalentScore::where('section_id', $section->id)->get();
            foreach($s as $sc){
                array_push($scores, $sc);
            }
        }

        $result['group'] = $group;
        $result['sections'] = $sections;
        $result['scores'] = $scores;

        return $result;

        /*
            {
                group: {id},
                sections: [{id, group_id}],
                scores: [{id, section_id}]
            }
        */
	}


    public function newReportForGroup($id){
        $result;
        $group;
        $sections;
        $scores;

        $group = TalentGroup::findOrFail($id);
        $sections = TalentSection::where('group_id', $id)->get();

        for($i = 0 ; $i < count($sections); $i++){
            $sections[$i]->scores = TalentScore::where('section_id',$sections[$i]->id)->get();
        }

        $group->sections = $sections;

        return $group;

        /*
            {
                group: {id},
                sections: [{id, group_id}],
                scores: [{id, section_id}]
            }
        */
    }


}