import { openComposer } from 'react-native-email-link';
import { LogEntry } from '~/models/logs/LogEntry';
import { format } from 'date-fns';

export class EmailService {
    static emailLogEntry(logEntry: LogEntry) {
        const emailBody = EmailService.createEmailBody(logEntry);
        const subject = 'Pool Service Summary';
        EmailService.sendEmail(subject, emailBody);
    }

    // function that accepts LogEntry and returns string for email body
    private static createEmailBody = (logEntry: LogEntry) => {
        // putting date in format desired for email body
        const dateFormat = format(logEntry.ts, 'MMM d, y') + format(logEntry.ts, '  //  h:mma').toLowerCase();

        // creating Readings string for body of email
        const readings = logEntry.readingEntries
            .map((r) => {
                if (r.units === null) {
                    return `${r.readingName}: ${r.value}`;
                } else {
                    return `${r.readingName}: ${r.value} ${r.units}`;
                }
            })
            .join('\n');

        // creating Treatments string for body of email
        const treatments = logEntry.treatmentEntries
            .map((t) => {
                return `${t.treatmentName}: ${t.displayAmount} ${t.displayUnits}`;
            })
            .join('\n');

        // return string that will be body of email
        return (
            dateFormat +
            '\n\n' +
            'Readings:\n' +
            readings +
            '\n\n' +
            'Treatments:\n' +
            treatments +
            '\n\n' +
            'Notes:\n' +
            logEntry.notes
        );
    };

    // function that sends the email and accepts strings for subject and logEntry
    private static sendEmail(subject: string, emailBody: string) {
        // for now I've hardcoded subject, but if its value came from somewhere, this would autopopulate
        // the subject line if it is undefined
        if (subject === undefined) {
            subject = 'Pool Service Summary';
        }

        try {
            openComposer({
                subject,
                body: emailBody,
            });
        } catch (e) {
            console.error('Could not open email app: ' + e);
        }
    }
}
