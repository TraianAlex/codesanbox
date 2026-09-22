import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot, updateSettings } from './api';

export function NetworkPanel() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  const { requests, settings } = state;

  return (
    <div className={"network-panel" + (settings.error ? " error" : "")}>
      <div className="control-row">
        <label>
          Randomize latency
        </label>
          <input 
            type="checkbox" checked={settings.randomize} 
            onChange={e => updateSettings({ randomize: e.target.checked })} 
          />
      </div>
      <div className="control-row">
        <label>
          Always Error
        </label>
          <input 
            type="checkbox" checked={settings.error} 
            onChange={e => updateSettings({ error: e.target.checked })} 
          />
      </div>
      <div className="request-list">
        {requests.map(req => (
          <div key={req.id} className="request-item">
            <div className="req-info">
              <span className="method">POST</span>
              <span className="path">{req.path}</span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-bar" 
                style={{ animationDuration: `${req.duration}ms` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}