<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlertesTable extends Migration
{
    public function up()
    {
        Schema::create('alertes', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->enum('niveau', ['info', 'warning', 'critique']);
            $table->enum('statut', ['lu', 'non lu']);
            $table->datetime('date');
            $table->foreignId('examen_id')->nullable()->constrained('examens')->onDelete('cascade');
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('alertes');
    }
}
