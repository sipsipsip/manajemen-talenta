<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTalentScoresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('talent_scores', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('nama');
			$table->integer('usia');
			$table->string('nip');
			$table->string('nama_jabatan');
			$table->string('eselon');
			$table->integer('ki');
			$table->integer('ku');
			$table->integer('nkp');
			$table->integer('section_id');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('talent_scores');
	}

}
