<?php
/**
 * Created by PhpStorm.
 * User: pieterpaul.luijten
 * Date: 7-8-2016
 * Time: 14:23
 */

ini_set('SMTP', 'smtp.transip.email');
ini_set('smtp_port', 465);

class Email
{
    public static function SendEmail($name, $email, $message) {
        $targetEmail = "info@daarwordikstilvan.nl";

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: Daar word ik stil van <noreply@daarwordikstilvan.nl>' . "\r\n";

        $emailMessage = "Beste Joke,<br />
            <br />
            Een bezoeker van de website heeft een reactie geplaatst via het contactformulier. Het betreft de volgende persoon:<br />
            <br />
            Naam: <b>$name</b><br />
            E-mailadres: <b>$email</b><br />
            <br />Het bericht:<br />
            <b>$message</b><br />
            <br />
            <i>Groetjes, Pieter</i>";
        return mail($targetEmail, "Reactie via contactformulier website", $emailMessage, $headers);
    }

    public static function SubscribeToNewsletter($name, $email) {
        $targetEmail = "info@daarwordikstilvan.nl";

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: Daar word ik stil van <noreply@daarwordikstilvan.nl>' . "\r\n";

        $emailMessage = "Beste Joke,<br />
            <br />
            Een bezoeker van de website heeft zich ingeschreven voor de nieuwsbrief. Het betreft de volgende persoon:<br />
            <br />
            Naam: <b>$name</b><br />
            E-mailadres: <b>$email</b><br />
            <br />
            <i>Groetjes, Pieter</i>";
        return mail($targetEmail, "Inschrijving voor nieuwsbrief", $emailMessage, $headers);
    }
}
?>