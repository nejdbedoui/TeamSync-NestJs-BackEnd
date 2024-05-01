
import { Request } from 'express';
import { User } from 'src/Schema/User.Schema';

 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;