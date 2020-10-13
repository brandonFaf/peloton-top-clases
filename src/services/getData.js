import authenticate from './authenticate';
import getWorkoutList from './getWorkoutList';
import getDetails from './getDetails';
import logger from './utils/logger';

export default async () => {
  logger.info('logging in');
  const { user_id, session_id } = await authenticate().catch(err => {
    logger.error('error authenticating', err);
    throw err;
  });
  logger.info('logged in');
  logger.info('getting workouts');
  const workouts = await getWorkoutList(user_id, session_id).catch(err => {
    logger.error('error getting workouts', err);
    return [];
  });
  logger.info('fetched workouts');
  logger.info('getting details');
  const workoutData = await getDetails(workouts, session_id).catch(err => {
    logger.error('error getting workout data', err);
    return [];
  });
  logger.info('processesing data');
  const data = workoutData.map(({ metrics }) => {
    const values = metrics.map(
      ({ display_name, max_value, average_value }) => ({
        display_name,
        max_value,
        average_value
      })
    );
    return {
      values
    };
  });
  logger.log(JSON.stringify(data, null, 2));
};
