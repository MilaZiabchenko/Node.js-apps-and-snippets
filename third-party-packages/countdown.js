import parseArgs from 'minimist';
import Timer from 'tiny-timer';

const { hours, minutes, seconds } = parseArgs(process.argv);

if (
  !Number.isFinite(hours) ||
  !Number.isFinite(minutes) ||
  !Number.isFinite(seconds)
) {
  throw new Error(
    '--hours, --minutes, and --seconds are required and must all be numbers!'
  );
}

const formattedHours = hours.toString().padStart(2, '0');
const formattedMinutes = minutes.toString().padStart(2, '0');
const formattedSeconds = seconds.toString().padStart(2, '0');

console.log(process.argv);
console.log(
  `Current time is ${formattedHours}:${formattedMinutes}:${formattedSeconds}.`
);

const timer = new Timer();

process.stdout.write(
  'Please, enter "y" to confirm seconds or "n" otherwise > '
);

process.stdin.on('data', data => {
  if (data.toString().trim().toLowerCase() === 'y') {
    timer.start(seconds * 1000);
  }

  if (data.toString().trim().toLowerCase() === 'n') {
    process.stdout.write('Please, enter new seconds > ');
    process.stdin.on('data', data => {
      timer.start(parseInt(data.toString()) * 1000);
    });
  }
});

timer.on('tick', ms =>
  console.log('ticking', `${Math.round(ms / 1000)} sec...`)
);

timer.on('done', () => {
  console.log('The ticking is complete.');

  process.exit();
});
