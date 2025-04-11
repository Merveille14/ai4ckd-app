<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class WorkflowReminderNotification extends Notification
{
    use Queueable;

    public $etape; // Étape du workflow

    public function __construct($etape)
    {
        $this->etape = $etape;
    }

    public function via($notifiable)
    {
        return ['mail']; // Type de notification (ici par email)
    }

    public function toMail($notifiable)
{
    return (new MailMessage)
                ->subject('Rappel : Étape du workflow')
                ->line('Une étape du workflow de l\'un de vos patients approche !')
                ->line('Détails de l\'étape :')
                ->line('Type : ' . $this->etape->type)
                ->line('Date prévue : ' . $this->etape->date_prev)
                ->line('Fréquence : ' . $this->etape->frequence)
                ->action('Voir les détails', url('/workflows/' . $this->etape->workflow_id))
                ->line('Merci de gérer cette étape à temps !');
}

}
