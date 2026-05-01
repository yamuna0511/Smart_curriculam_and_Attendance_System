const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by upcoming
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching events' });
  }
};

exports.createEvent = async (req, res) => {
  const { title, description, date, department } = req.body;
  try {
    const newEvent = new Event({ title, description, date, department });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Server error creating event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting event' });
  }
};
