<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('diagnostics')) {
            Schema::create('diagnostics', function (Blueprint $table) {
                $table->id();
                $table->foreignId('patient_id')->constrained()->onDelete('cascade');
                $table->foreignId('consultation_id')->constrained()->onDelete('cascade');
                $table->enum('stade_maladie', ['stade_1', 'stade_2', 'stade_3', 'stade_4', 'stade_5']);
                $table->text('diagnostic');
                $table->dateTime('date_diagnostic');
                $table->text('commentaires')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('diagnostics');
    }
};