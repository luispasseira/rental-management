<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('contact');
            $table->unsignedInteger('client_id');
            $table->boolean('is_active')->default(true);
            $table->foreign('client_id')->references('id')->on('clients');
            $table->unsignedInteger('contact_type_id');
            $table->foreign('contact_type_id')->references('id')->on('contact_types');

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
        Schema::dropIfExists('clients_contacts');
    }
}
