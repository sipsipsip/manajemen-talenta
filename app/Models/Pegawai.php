<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model {

	protected $table = 'users';

	public function datadiri(){
        return $this->hasOne('App\Models\Datadiri', 'nip', 'nip');
    }

}
