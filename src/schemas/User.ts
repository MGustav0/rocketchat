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
    required: true,
    unique: true,
  },
  socket_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<User>('Users', UserSchema);

export { User };
