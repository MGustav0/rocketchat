import mongoose, { Document, Schema } from 'mongoose';

type User = Document & {
  email: string;
  socket_id: string;
  name: string;
  avatar: string;
};

const UserSchema = new Schema({
  email: {
    type: String,
  },
  socket_id: {
    type: String,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

const User = mongoose.model<User>('Users', UserSchema);

export { User };
