import { expect } from 'chai';
import eventsReducer, {initialState} from 'src/reducers/events'
import {setEvents, setAddNewEvent, setFieldValueEvent, idEventSelected, setParticipate} from 'src/actions/events'

/**
 * function that checks the structure
 */
describe('reducer for events', ()=>{

  describe('structure',()=>{
    it('must be a function', ()=>{
      expect(eventsReducer).to.a('function');
    })
      
    it ('check initial state', ()=>{
      expect(initialState).to.be.an('object');
      expect(eventsReducer()).to.be.equal(initialState)
    })
  })
})

/**
 * function that tests the actions of the reducers
 */
 describe('actions', () => {
 it('setEvents must set events', () => {
      const newValueEvents = [{
          id: 2,
          title: 'un nouvel évènement',
          description: 'une description ',
          eventDate: '',
          createdDate: '',
          updateDate: null,
          creatorId: 2,
          tagId: 2,
          eventTag: 'news',
          creatorPseudo: 'maurice',
          eventParticipants: [],
          eventGames: [],
        }]
      const action = setEvents(newValueEvents);
      const newState = eventsReducer(initialState, action);
      expect(newState).to.be.eql({ 
        events: newValueEvents, 
        newTitle: '',
        newDescription: '',
        newEventDate: '',
        newTagId: '',
        idEvent: '',
        toParticipate: false,
        newEvent: false,
    });
  });
    it('setAddNewEvent must set add new events', () => {
          const newValueEvent = true;
          const action = setAddNewEvent(newValueEvent);
          const newState = eventsReducer(initialState, action);
          expect(newState).to.be.eql({ 
           events: [{
              id: 1,
              title: '',
              description: '',
              eventDate: '',
              createdDate: '',
              updateDate: null,
              creatorId: 2,
              tagId: 2,
              eventTag: '',
              creatorPseudo: '',
              eventParticipants: [],
              eventGames: [],
            },
          ],
          newTitle: '',
          newDescription: '',
          newEventDate: '',
          newTagId: '',
          idEvent: '',
          toParticipate: false,
          newEvent: newValueEvent,
        });
    
      });
  
    it('setFieldValueEvent must set field value events', () => {
          const titleValue = 'un titre';
          const titleName = 'newTitle'
          const action = setFieldValueEvent(titleValue,titleName);
          const newState = eventsReducer(initialState, action);
          expect(newState).to.be.eql({ 
            events: [{
              id: 1,
              title: '',
              description: '',
              eventDate: '',
              createdDate: '',
              updateDate: null,
              creatorId: 2,
              tagId: 2,
              eventTag: '',
              creatorPseudo: '',
              eventParticipants: [],
              eventGames: [],
            },
          ],
          newTitle: titleValue,
          newDescription: '',
          newEventDate: '',
          newTagId: '',
          idEvent: '',
          toParticipate: false,
          newEvent: false,
        });
    });
      it('idEventSelected must set id events selected', () => {
            const newValueIdEvent = '1';
            const action = idEventSelected(newValueIdEvent);
            const newState = eventsReducer(initialState, action);
            expect(newState).to.be.eql({ 
             events: [{
                id: 1,
                title: '',
                description: '',
                eventDate: '',
                createdDate: '',
                updateDate: null,
                creatorId: 2,
                tagId: 2,
                eventTag: '',
                creatorPseudo: '',
                eventParticipants: [],
                eventGames: [],
              },
            ],
            newTitle: '',
            newDescription: '',
            newEventDate: '',
            newTagId: '',
            idEvent: newValueIdEvent,
            toParticipate: false,
            newEvent: false,
          });
      
        });

    it('setParticipate must set add new events', () => {
          const toParticipate = true;
          const action = setParticipate(toParticipate);
          const newState = eventsReducer(initialState, action);
          expect(newState).to.be.eql({ 
           events: [{
              id: 1,
              title: '',
              description: '',
              eventDate: '',
              createdDate: '',
              updateDate: null,
              creatorId: 2,
              tagId: 2,
              eventTag: '',
              creatorPseudo: '',
              eventParticipants: [],
              eventGames: [],
            },
          ],
          newTitle: '',
          newDescription: '',
          newEventDate: '',
          newTagId: '',
          idEvent: '',
          toParticipate: toParticipate,
          newEvent: false,
        });
    
      });
 });
