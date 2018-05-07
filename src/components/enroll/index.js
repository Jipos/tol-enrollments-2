import Mn from 'backbone.marionette';
import Controller from './controller';
import {channel} from 'backbone.toledo';

const API = {
  show: () => {
    // TODO: KR creating a Controller for it's side-effects is a bit icky.
    // add a method which does the actual processing seems preferable.
    // But what to call it?
    // 'show' is already taken, and doesn't quite fit, since the method might also do things
    // like load entities, do some precondition checks, etc.
    // 'start' matches the 'start:xyz:app' events from backbonerails, but makes me thing it
    // can only be called once, which is no longer necessary if you don't start in the initialize
    // function.
    // IDEA: what if we pass the controller instance itself as the controller to the router?
    // Then we can name the functions in a way they match with the controller's purpose (e.g.
    // 'showEnrollComponent', or even 'enroll' which matches the route).
    // The 'shown' event will then probably have to be triggered from within the controller, instead
    // of in this index file.
    // SUMMARY: then the root file of the component is responsible for triggering the component,
    // either through the channel or through a router. The controller file, controls the component
    // itself, it's responsible for orchestrating the component (e.g. loading entities, instantiating
    // the necessary views, triggering the necessary events). The views file contains the views.
    // NOTE: the new approach would register an instance of controller to the router. This means a
    // reference to the controller exists after it's created. Doing so requires extra care in cleaning
    // up things. In the initial backbonerails code, when a view gets destroyed, it triggersthe
    // controller's destroy function. This unregisters all event listeners, so that no references to
    // the controller or the view (the controller was showing) remain. When the router contains a
    // reference to the controller, and the controller keeps a reference to the view, the view might
    // not get cleaned up, after it is destroyed. That is to say, it's events might get cleaned up,
    // but the memory might not. The original code left the _mainView variable as it was. This hinders
    // memory cleanup, and breaks the controller if we try to use it again. Resetting the _mainView
    // variable if a controller is destroyed might solve this problem. In the new setup 'destroy'
    // might be an odd name for the function? Maybe 'reset' would be better? Because we are no longer
    // destroying the controller itself, we are just unshowing the view which it showed.
    new Controller();
    channel.trigger('component:shown', 'enroll');
  }
}

const EnrollRouter = Mn.AppRouter.extend({
  appRoutes: {
    'enroll': 'show'
  }
});

const router = new EnrollRouter({controller: API});

channel.on('show:enroll:component', function () {
  router.navigate('enroll', {trigger: true});
});
