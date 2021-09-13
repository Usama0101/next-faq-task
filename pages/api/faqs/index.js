import nc from 'next-connect';
import { allFaqs, createFaq } from '../../../controllers/faqController';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(allFaqs);
handler.post(createFaq);

export default handler;