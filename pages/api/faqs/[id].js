import nc from 'next-connect';
import { getSingleFaq, updateFaq, deleteFAQ } from '../../../controllers/faqController';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(getSingleFaq);
handler.put(updateFaq);
handler.delete(deleteFAQ);

export default handler;