<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Datadiri extends Model {

	protected $table = 'datadiri';

	public function owner(){
	    return $this->belongsTo('App\Models\Pegawai', 'nip', 'nip');
	}

}
